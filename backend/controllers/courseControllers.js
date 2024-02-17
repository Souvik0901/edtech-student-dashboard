const mongoose = require('mongoose');
const Courses = require('../models/courses');
const RecentlyViewed = require('../models/recentlyviewed');

const ResponseObjectClass = require('../helpers/ResponseObject');
const newResponseObject = new ResponseObjectClass();

// create a  single course
const createCourseWithImage = async (req, res) => {
  try {
    if (req.file) {
      const imageUrl = `/node/api/core/images/${req.file.filename}`;

      const course = new Courses({
        courseImage: imageUrl,
        courseTitle: req.body.courseTitle,
        shortDescrp: req.body.shortDescrp,
        longDescrp: req.body.longDescrp,
        courseCategory: req.body.courseCategory,
        courseLevel: req.body.courseLevel,
        courseLanguage: req.body.courseLanguage,
        lectures: req.body.lectures,
        price: req.body.price,
        period: req.body.period,
        purchaseDate: req.body.purchaseDate,
        videoLink: req.body.videoLink,
        user_id: req.user.userId,
      });

      await course.save();

      return res.send(
        newResponseObject.create({
          code: 200,
          success: true,
          message: 'Course creation successful',
          data: course,
        }),
      );
    }
    return res.send(
      newResponseObject.create({
        code: 200,
        success: false,
        message: 'Image Upload Failed',
        data: {},
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'internal server error',
      }),
    );
  }
};

// get all courses
const getCourses = async (req, res) => {
  const search = req.query.search || '';
  const courseLevel = req.query.courseLevel || '';
  const courseLanguage = req.query.courseLanguage || '';
  const query = {
    courseTitle: { $regex: search, $options: 'i' },
    courseLevel: { $regex: courseLevel, $options: 'i' },
    courseLanguage: { $regex: courseLanguage, $options: 'i' },
  };
  const sortoption = req.query.sort || '';

  try {
    const courses = await Courses.find({ ...query }).sort({
      purchaseDate: sortoption === 'Newest' ? -1 : 1,
    });

    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalcourse = courses.length;
    results.pageCount = Math.ceil(courses.length / limit);

    if (lastIndex < courses.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.result = courses.slice(startIndex, lastIndex);

    if (!courses || courses.length === 0) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'No Courses Found',
          data: {},
        }),
      );
    }

    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'showing collections successfully',
        ...results,
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'internal server error',
      }),
    );
  }
};

// get single course
const getSingleCourse = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'No Courses Found',
          data: {},
        }),
      );
    }

    const course = await Courses.findById({ user_id: userId, _id: id }).populate('user_id').exec();

    if (!course) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'No Courses Found',
          data: {},
        }),
      );
    }

 // Store the recently viewed course 
    let recentlyViewedCourse = await RecentlyViewed.findOneAndUpdate(
      { userId, courseId: id },
      { 
        $set: { 
          updatedAt: new Date(),
          createdAt: { $cond: [{ $eq: ["$createdAt", null] }, new Date(), "$createdAt"] }
        } 
      },
      { upsert: true, new: true }
    );

 
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'showing course details',
        data: course,
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'internal server error',
      }),
    );
  }
};

// get recently viewed courses
const getRecentlyViewedCourses = async (req, res) => {
  const { userId } = req.user;

  try {
    const recentlyViewed = await RecentlyViewed.find({ userId })
    .sort({ updatedAt: -1 })
    .limit(5)
    .populate('courseId')
    .exec();

    return res.send({
      code: 200,
      success: true,
      message: 'Showing recently viewed courses',
      data: recentlyViewed, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Internal server error',
    });
  }
};

// get all paginated courses
const paginatedCourses = async (req, res) => {
  const { userId } = req.user;

  const search = req.query.search || '';
  const query = {
    courseTitle: { $regex: search, $options: 'i' },
  };

  const sortoption = req.query.sort || '';

  try {
    const courses = await Courses.find({ user_id: userId, ...query }).sort({
      purchaseDate: sortoption === 'Newest' ? -1 : 1,
    });

    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalcourse = courses.length;
    results.pageCount = Math.ceil(courses.length / limit);

    if (lastIndex < courses.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.result = courses.slice(startIndex, lastIndex);

    if (!courses || courses.length === 0) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'No Courses Found',
          data: {},
        }),
      );
    }

    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'showing collections successfully',
        ...results,
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'internal server error',
      }),
    );
  }
};

// delete a single course
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'invalid courseid',
        }),
      );
    }

    const course = await Courses.findOneAndDelete({ user_id: userId, _id: id });

    if (!course) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'no such CourseCollection',
        }),
      );
    }

    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Delete Course Successfully',
        data: course,
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'internal server error',
      }),
    );
  }
};

// update a single  course
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'Invalid course ID',
        }),
      );
    }

    // Find the existing course by ID
    const existingCourse = await Courses.findByIdAndUpdate({ user_id: userId, _id: id });

    if (!existingCourse) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'Course Not Found',
        }),
      );
    }

    // Update the course fields based on the request body
    existingCourse.courseTitle = req.body.courseTitle || existingCourse.courseTitle;
    existingCourse.shortDescrp = req.body.shortDescrp || existingCourse.shortDescrp;
    existingCourse.longDescrp = req.body.longDescrp || existingCourse.longDescrp;
    existingCourse.courseCategory = req.body.courseCategory || existingCourse.courseCategory;
    existingCourse.courseLevel = req.body.courseLevel || existingCourse.courseLevel;
    existingCourse.courseLanguage = req.body.courseLanguage || existingCourse.courseLanguage;
    existingCourse.lectures = req.body.lectures || existingCourse.lectures;
    existingCourse.price = req.body.price || existingCourse.price;
    existingCourse.period = req.body.period || existingCourse.period;
    existingCourse.purchaseDate = req.body.purchaseDate || existingCourse.purchaseDate;
    existingCourse.videoLink = req.body.videoLink || existingCourse.videoLink;

    // Check if an image is being uploaded
    if (req.file) {
      existingCourse.courseImage = `/node/api/core/images/${req.file.filename}`;
    }

    // Save the updated course
    await existingCourse.save();

    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Course Updated Successfully',
        data: existingCourse,
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'internal server error',
      }),
    );
  }
};

// clear all recently-view courses
const clearAllViewedCourses = async (req, res) => {
  const { userId } = req.user;

  try {
    // Delete all recently viewed courses for the user
    await RecentlyViewed.deleteMany({ userId });

    return res.send({
      code: 200,
      success: true,
      message: 'All viewed courses cleared successfully',
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Internal server error',
    });
  }
};


module.exports = {
  createCourseWithImage,
  paginatedCourses,
  deleteCourse,
  updateCourse,
  getCourses,
  getSingleCourse,
  getRecentlyViewedCourses,
  clearAllViewedCourses
};



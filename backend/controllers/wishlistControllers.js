const WishedCourses = require('../models/wishedcourses');
const Courses = require('../models/courses');
const ResponseObjectClass = require('../helpers/ResponseObject');

const newResponseObject = new ResponseObjectClass();

const createLikedCourse = async (req, res) => {
  const { userId } = req.user;
  const { courseId } = req.body;

  try {
    // Check if the courseId already exists in the database
    const existingWishedCourse = await WishedCourses.findOne({ courseId, userId });

    if (existingWishedCourse) {
      // if already exist then for again paasing the courseId, will delete from db.
 
      await Courses.findByIdAndUpdate(courseId, { courseLiked: false });

      await WishedCourses.findByIdAndDelete(existingWishedCourse._id);

      return res.send(
        newResponseObject.create({
          code: 400,
          success: false,
          message: 'Remove the course From Wishlist',
        }),
      );
    }

    // If courseId doesn't exist, create and save the new wished course
    const wishedCourse = new WishedCourses({
      courseId,
      userId,
    });

    await wishedCourse.save();
    
    await Courses.findByIdAndUpdate(courseId, { courseLiked: true });

    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'liked course added successfully',
        data: wishedCourse,
      }),
    );
  } catch (error) {
    console.log(error);
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Internal server error',
      }),
    );
  }
};

const getWishlistCourses = async (req, res) => {
  const { userId } = req.user;

  try {
    const wishlistCourses = await WishedCourses.find({ userId }).populate('courseId');

    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Wishlist courses retrieved successfully',
        data: wishlistCourses,
      }),
    );
  } catch (error) {
    console.log(error);
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Internal server error',
      }),
    );
  }
};

const clearWishlist = async (req, res) => {
  const { userId } = req.user;

  try {
    // Get all wished courses for the user
    const wishedCourses = await WishedCourses.find({ userId });

    // Get the ids of all courses in the wishlist
    const courseIds = wishedCourses.map(wishedCourse => wishedCourse.courseId);

    // Update courseLiked to false for all courses in the wishlist
    await Courses.updateMany({ _id: { $in: courseIds } }, { courseLiked: false });

    // Delete all wished courses for the user
    await WishedCourses.deleteMany({ userId });

    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Wishlist cleared successfully',
      }),
    );
  } catch (error) {
    console.log(error);
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Internal server error',
      }),
    );
  }
};


module.exports = {
  createLikedCourse,
  getWishlistCourses,
  clearWishlist,
};


const Review = require('../models/review');
const ResponseObjectClass = require('../helpers/ResponseObject');

const newResponseObject = new ResponseObjectClass();
const postReview = async (req, res) => {
  try {
    const { userId } = req.user;
    const studentreview = await Review.findOne({ courseId: req.body.courseId, student: userId });
    console.log(studentreview);
    if (studentreview) {
      return res.send(
        newResponseObject.create({
          code: 201,
          success: true,
          message: 'you have already made a review',
        }),
      );
    }
    const reviewdata = {
      review: req.body.review,
      ratings: req.body.ratings,
      courseId: req.body.courseId,
      student: userId,
    };
    const reviewData = await Review.create(reviewdata);
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'reviewed added successful',
        data: {
          reviewData,
        },
      }),
    );
  } catch (error) {
    console.log(error);
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Internal Server Error',
      }),
    );
  }
};
const getReview = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const reviews = await Review.find({ userId, courseId: id })
      .populate('student')
      .populate('courseId')
      .exec();
    if (!reviews || reviews.length === 0) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'No Reviews Found',
          data: {},
        }),
      );
    }
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'showing collections successfully',
        data: reviews,
      }),
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Internal Server Error',
      }),
    );
  }
};

const getReviewsInstructorView = async (req, res) => {
  try {
    const { userId } = req.user;
    const reviews = await Review.find({ userId }).populate('student').populate('courseId').exec();
    if (!reviews || reviews.length === 0) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'No Reviews Found',
          data: {},
        }),
      );
    }
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'showing collections successfully',
        data: reviews,
      }),
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Internal Server Error',
      }),
    );
  }
};
const sendReply = async (req, res) => {
  try {
    const { reviewId, reply } = req.user;
    const review = await Review.findOne({ _id: reviewId }); // Assuming reviewId is the ObjectId of the review
    if (!review) {
      return res.send(
        newResponseObject.create({
          code: 404,
          success: false,
          message: 'Review not found',
          data: {},
        }),
      );
    }
    if (review.reply.length !== 0) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'You have already replied to the post',
          data: {},
        }),
      );
    }
    review.reply = reply;
    await review.save();
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Successfully replied to the review',
        data: { review },
      }),
    );
  } catch (error) {
    console.log(error);
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Internal Server Error',
      }),
    );
  }
};

module.exports = {
  postReview,
  getReview,
  getReviewsInstructorView,
  sendReply,
};

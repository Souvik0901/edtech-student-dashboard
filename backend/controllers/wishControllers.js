const mongoose = require('mongoose');
const WishedCourses = require('../models/wishedcourses');
const ResponseObjectClass = require('../helpers/ResponseObject');
const newResponseObject = new ResponseObjectClass();



const createLikedCourse = async (req, res) => {
  const { userId } = req.user;
  const {courseId } = req.body;
  try {
      // Check if the courseId already exists in the database
      const existingWishedCourse = await WishedCourses.findOne({ courseId, userId });

      if (existingWishedCourse) {
        return res.send(
          newResponseObject.create({
            code: 400,
            success: false,
            message: 'Course already exists in the wishlist',
          }),
        );
      }

     // If courseId doesn't exist, create and save the new wished course
     const  wishedCourse = new WishedCourses({
        courseId,
        userId
      });
      await wishedCourse.save();
    
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'liked course added successfully' ,
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
    const wishlistCourses = await WishedCourses.find({ userId });
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

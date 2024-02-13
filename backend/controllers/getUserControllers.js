const mongoose = require('mongoose');
const ResponseObjectClass = require('../helpers/ResponseObject');
const newResponseObject = new ResponseObjectClass();
const Users = require('../models/user');


const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await Users.findOne({ _id: userId });
    if (!user) {
      return res.send(
        newResponseObject.create({
          code: 401,
          success: true,
          message: 'user does not exists',
        }),
      );
    }
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        userDetails: user,
      }),
    );
  } catch (err) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Error during login',
        error: err.message,
      }),
    );
  }
};

// get a Single user details with help of USERID
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'No valid user',
          data: {},
        }),
      );
    }

    const user = await Users.findById(id);

    if (!user) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: false,
          message: 'No user found',
          data: {},
        }),
      );
    }

    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'showing user details',
        data: user,
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

module.exports = { getUser, getSingleUser };

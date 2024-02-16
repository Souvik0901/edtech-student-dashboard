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


module.exports = { getUser, };

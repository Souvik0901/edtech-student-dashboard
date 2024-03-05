const AWS = require('aws-sdk');
const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const ResponseObjectClass = require('../helpers/ResponseObject');

const newResponseObject = new ResponseObjectClass();
const Users = require('../models/user');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.user;
    const user = await Users.findOne({ _id: userId });
    if (!user) {
      return res.send(
        newResponseObject.create({
          code: 401,
          success: true,
          message: 'User does not exist!',
        }),
      );
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.send(
        newResponseObject.create({
          code: 401,
          success: true,
          message: 'Invalid password*',
        }),
      );
    }
    const newHashPassword = await bcrypt.hash(newPassword, 10);
    const result = await Users.updateOne({ _id: userId }, { $set: { password: newHashPassword } });

    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Password updated successfully',
        sucess: result,
      }),
    );
  } catch (err) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Error in changing the password',
        error: err.message,
      }),
    );
  }
};

const changeUserdata = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const { username, emailId, phoneNumber, location, abouttxt } = req.body;
    const { file } = req;
    const filename = `${v4()}_${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const uploadResult = await s3.upload(params).promise();

    const result = await Users.updateOne(
      { _id: userId },
      {
        $set: {
          name: username,
          email: emailId,
          profileImg: uploadResult.Location,
          phoneNumber,
          location,
          abouttxt,
        },
      },
    );
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Profile data updated successfully',
        data: result,
      }),
    );
  } catch (err) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: 'Error in updtaing users data',
        error: err.message,
      }),
    );
  }
};

module.exports = { changePassword, changeUserdata };

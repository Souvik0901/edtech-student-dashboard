const bcrypt = require('bcryptjs');
const ResponseObjectClass = require('../helpers/ResponseObject');
const newResponseObject = new ResponseObjectClass();
const Users = require('../models/user');
const { uploadFileToS3 } = require('../helpers/s3Client');



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
    const imageUrl = await uploadFileToS3(file);

    const result = await Users.updateOne(
      { _id: userId },
      {
        $set: {
          name: username,
          email: emailId,
          profileImg: imageUrl,
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

const AWS = require('aws-sdk');
const { v4 } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const uploadFileToS3 = async (file) => {
  const filename = `${v4()}_${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
};

module.exports = {
  uploadFileToS3,
};

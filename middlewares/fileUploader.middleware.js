const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.env.PUBLIC_FOLDER}/${process.env.IMAGE_FOLDER}`);
    },
    filename: function (req, file, cb) {
      const fileType = file.mimetype.split('/')[1];
      if (fileType !== 'png' && fileType !== 'jpeg' && fileType !== 'jpg') {
        return cb(new Error('File must be a picture type png, jpeg or jpg'));
      }
      const {
        user: { id },
      } = req;
      cb(null, `${id}.${fileType}`);
    },
  });
  return multer({ storage }).single('avatar');
};

module.exports = {
  avatarUploaderMiddleware: avatarUploader(),
};
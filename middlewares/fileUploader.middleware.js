const multer = require('multer');

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/avatars');
    },
    filename: function (req, file, cb) {
      console.log('avatarUploader ;', file);
      const fileType = file.mimetype.split('/')[1];
      cb(null, `${req.userId}.${fileType}`);
    },
  });

  return multer({ storage }).single('avatar');
};

module.exports = { avatarUploaderMiddleware: avatarUploader() };

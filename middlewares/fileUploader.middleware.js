<<<<<<< HEAD
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
=======
const multer = require('multer');

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images');
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
>>>>>>> refs/remotes/origin/05-images

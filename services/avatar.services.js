// const dotenv = require('dotenv');
// dotenv.config();
const {createAvatarInFolder} = require('../config')
const path = require('path');
const AvatarGenerator =require('avatar-generator')

async function madeAvatar(id) {
  const avatar = new AvatarGenerator({
    parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'],
    partsLocation: path.join(__dirname, `../${process.env.IMG_FOR_AVATAR}`),
    imageExtension: '.png',
  });
  const variant = 'female';
  const image = await avatar.generate(`${id}`, variant);
  image.png().toFile(createAvatarInFolder(id));
}
module.exports = { madeAvatar };
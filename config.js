require('dotenv').config();

const createAvatarInFolder = id =>
    `${process.env.PUBLIC_FOLDER}/${process.env.IMAGE_FOLDER}/${id}.png`;
  
const createAvatarUrl = id => `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${process.env.IMAGE_FOLDER}/${id}.png`  

const createURL = PORT => `${process.env.PROTOCOL}://${process.env.HOST}:${PORT}`

module.exports = {createAvatarInFolder,
    createAvatarUrl, createURL
    }
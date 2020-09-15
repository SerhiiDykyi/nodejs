const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const contactsRouter = require('./router');
const cors = require('cors');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', '*');
  res.setHeader('Access-Control-Allow-Method', '*');
  next();
});

app.use(express.json());

app.use('/contacts', contactsRouter);

app.listen(PORT, () => console.log(`Server worked/listening on ${PORT}`));

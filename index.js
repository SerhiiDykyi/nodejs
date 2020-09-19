const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs').promises;
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const contactsRouter = require('./api/contacts/router');

const runServer = async (err, req, res) => {
  await mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Database connection successful');

  const app = express();

  app.use(express.json());
  app.use(cors({ origin: 'http://localhost:3000' }));

  app.use('/contacts', contactsRouter);

  app.use(async (err, req, res, next) => {
    if (err) {
      let logs = await fs.readFile('errors.logs.json', { encoding: 'utf-8' });
      logs = JSON.parse(logs);
      logs.push({
        date: new Date().toISOString(),
        method: req.method,
        originalUrl: req.originalUrl,
        name: err.message,
      });
      logs = JSON.stringify(logs);
      await fs.writeFile('errors.logs.json', logs);
      console.error(err);
    }
    console.log('No error');
  });

  app.listen(PORT, () => console.log(`Server works on port ${PORT}`));
};

runServer();

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   next();
// });
// app.use(addAllowOriginHeader);
// app.options('*', addCorsHeaders);

// function addAllowOriginHeader(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   next();
// }
// function addCorsHeaders(req, res, next) {
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     req.headers['Access-control-request-method'],
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     req.headers['Access-control-request-headers'],
//   );
//   res.status(200).send();
// }

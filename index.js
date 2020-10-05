const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs').promises;
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const contactsRouter = require('./api/contacts/contacts.router');
const authRouter = require('./api/auth/auth.router');

const path = require('path');

const runServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log('Database connection successful');

    const app = express();

    app.use('/', express.static(path.resolve(__dirname, 'public')));

    app.use(express.json());
    app.use(cors({ origin: 'http://localhost:3000' }));

    app.use('/contacts', contactsRouter);
    app.use('/auth', authRouter);
    app.use('/users', authRouter);
    app.use(
      '/images',
      express.static(path.resolve(__dirname, 'public/images')),
    );

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
        console.error(err);
        res.status(500).send(err.message);
        return await fs.writeFile('errors.logs.json', logs);
      }
      console.log('No error');
    });

    app.listen(PORT, () => console.log(`Server works on port ${PORT}`));
  } catch (error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  }
};

runServer();

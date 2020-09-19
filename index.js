const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const contactsRouter = require('./router');
const cors = require('cors');

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   next();
// });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(addAllowOriginHeader);
// app.options('*', addCorsHeaders);
app.use('/contacts', contactsRouter);

function addAllowOriginHeader(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
}
function addCorsHeaders(req, res, next) {
  res.setHeader(
    'Access-Control-Allow-Methods',
    req.headers['Access-control-request-method'],
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    req.headers['Access-control-request-headers'],
  );
  res.status(200).send();
}

app.listen(PORT, () => console.log(`Server works on port ${PORT}`));

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

app.listen(PORT, () => console.log(`Server works on port ${PORT}`));

// const http = require("http");
// const argv = require("yargs").argv;
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } = require("./contacts");
// const { response } = require("express");

// const parsedBody = (request) => {
//   return new Promise((reselve, reject) => {
//     let body = [];
//     request
//       .on("data", (chank) => {
//         body.push(chank);
//       })
//       .on("end", () => {
//         const parsedBody = JSON.parse(body.toString());
//         reselve(parsedBody);
//       })
//       .on("err", (err) => {
//         reject(err);
//       });
//   });
// };

// const server = http.createServer(async (request, responce) => {
//   const { url, method } = request;
//   switch (url) {
//     case "/contacts":
//       switch (method) {
//         case "GET":
//           const contacts = await listContacts();
//           const parssedContacts = JSON.stringify(contacts);
//           responce.setHeader("Content-Type", "application/json");
//           responce.write(parssedContacts);
//           responce.end();
//           break;
//         case "POST":
//           const body = await parsedBody(request);
//           console.log(body);
//           await addContact(body);
//           responce.statusCode = 201;
//           responce.end();
//           break;
//         case "DELETE":
//           const { query } = request;
//           console.log(query);
//           responce.end();
//           break;
//       }
//       break;
//     default:
//       responce.write("<h1>not found</h1>");
//       responce.end();
//   }
// });

// server.listen(3000, (error) => {
//   if (error) return console.error(error);
//   console.log(`Server works on port ${3000}`);
// });

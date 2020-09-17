[{ "date": "2020-09-14T14:58:13.031Z", "name": "Error is exists" }]

// app.get("/getError/:name", (req, res, next) => {
//   try {
//     if (req.params.name === "err") {
//       throw new Error("Error is exists");
//     }
//     res.send("No error");
//   } catch (e) {
//     next(e);
//   }
// });

// app.get("/logs", async (req, res) => {
//   let logs = await fs.readFile("errors.logs.json", { encoding: "utf-8" });
//   logs = JSON.parse(logs);
//   res.json(logs);
// });

// app.use(async (err, req, res, next) => {
//   if (err) {
//     let logs = await fs.readFile("errors.logs.json", { encoding: "utf-8" });
//     logs = JSON.parse(logs);
//     logs.push({
//       date: new Date().toISOString(),
//       name: err.message,
//     });
//     logs = JSON.stringify(logs);
//     await fs.writeFile("errors.logs.json", logs);
//     console.error(err);
//   }
//   console.log("No error");
// });

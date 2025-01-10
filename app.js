/* Basic Setup */
const express = require("express");
const categoryRouter = require("./routes/categoryRoute");
const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/* USE routes */
app.get("/favicon.ico", (req, res) => res.status(204));

app.use("/category", categoryRouter);
app.use("/", categoryRouter);
/* Listen the PORT */
app.listen(PORT, () => {
  console.log(`PORT ${PORT} is Active.`);
});

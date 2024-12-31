/* Basic Setup */
const express = require("express");
const indexRouter = require("./routes/indexRoute");
const categoryRouter = require("./routes/categoryRoute");
const itemRouter = require("./routes/itemRoute");
const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/* USE routes */
app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/item", itemRouter);
/* Listen the PORT */
app.listen(PORT, () => {
  console.log(`PORT ${PORT} is Active.`);
});

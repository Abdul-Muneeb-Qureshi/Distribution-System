const express = require("express");
const app = express();
require("./utils/db");
const bodyparser = require("body-parser");
const userRouter = require("./routes/userRoute");
const employeeRouter = require("./routes/employeeRoute");
const riderRouter = require("./routes/riderRoute");
const shopRouter = require("./routes/shopRoute");

const PORT = 3006;
//    MiddleWares
app.use(bodyparser.json());
app.use("/api", userRouter);
app.use("/api", employeeRouter);
app.use("/api", riderRouter);
app.use("/api", shopRouter);
app.get("/", (req, res) => {
  res.send("distribution started");
});

app.listen(PORT, () => {
  console.log("Server is running on the port", PORT);
});

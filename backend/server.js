const express = require("express");
const app = express();
const cors = require("cors");
require("./utils/db");
const bodyparser = require("body-parser");
const userRouter = require("./routes/userRoute");
const employeeRouter = require("./routes/employeeRoute");
const riderRouter = require("./routes/riderRoute");
const shopRouter = require("./routes/shopRoute");
const corsOptions = {
  origin: "http://localhost:5173", // Update with your frontend URL
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
const PORT = 3006;
//    MiddleWares
app.use(cors());
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

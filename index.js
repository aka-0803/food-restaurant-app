const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//dotenv configuration
dotenv.config();

//DB connection
connectDB();

const app = express();

//PORT
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
//URL => http://localhost:8080
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Amma Kitchen </h1>");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

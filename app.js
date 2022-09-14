// Require neccessary npm packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connection = require("./database/config-db");

const userRoute = require("./routes/userRoute");
const app = express();

//Express middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

app.use("/users",userRoute);






const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Server started running on port ${port}`);
});
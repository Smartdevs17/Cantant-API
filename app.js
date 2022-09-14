// Require neccessary npm packages
const env = process.env.NODE_ENV || "development";
// console.log(env);
if(env === "test"){
    process.env.PORT = 5000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/CantantTestDB"
}else{
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/CantantDB"
}
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

app.use("/api/users",userRoute);






const port = process.env.PORT;
app.listen(port, () =>{
    console.log(`Server started running on port ${port}`);
});

module.exports = app;
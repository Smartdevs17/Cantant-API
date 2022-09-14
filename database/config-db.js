const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true})
const connection = mongoose.connection;
connection.on("error",(error) => console.log(error));
connection.once("open", () => console.log("successfully connected to db"));

module.exports = connection;
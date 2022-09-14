const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        unique: true,
        default: mongoose.Types.ObjectId
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: `{VALUE} is not a valid email`
        }
    },
    accountId:{
        type: mongoose.ObjectId,
        unique: true,
        default: mongoose.Types.ObjectId
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    return _.pick(userObject,["userId","firstName","lastName","accountId"]);
};

userSchema.pre("save",function(next){
    const user = this;
    if(user.isModified("password")){
        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(user.password,salt,(err,hashedPassword) => {
                user.password = hashedPassword;
                next();
            });
        });
    }else{
        next();
    }
});

const User = mongoose.model("User",userSchema);

module.exports = User;
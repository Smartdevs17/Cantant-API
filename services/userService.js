const User = require("../models/User");

//Add new user to db
const AddUser = (data) => {
    const newuser = new User(data)
    return newuser.save()
            .then((user) => {
        return {success: true,message: user}
    })
    .catch((err) => {
        console.log(err)
        return {success: false, message: "an error occured while adding user", error: err.message}
    })
};

// Get a user based on valid id
const FetchUser = (id) => {
    return User.findOne({userId: id}).then((user) => {
            if(user){
                return {success: true, message: user}
            }else{
                return {success: false, message: "No use found with that id"};
            }
    })
    .catch((err) => {
        console.log(err)
        return {success: false, message: err}
    })
};

//Get all users in DB
const FetchAllUsers = () => {
    return User.find().then((users) => {
            if(!users){
                return {success: false, message: "No record of users"};
            }else{
                return {success: true, message: users};
            }
    })
    .catch((err) => {
        console.log(err);
        return {success: false, message: "an error occurred while fetching all user", error: err};
    })
};

//Edit user with a valid id
const EditUser = (id,data)=> {
    return User.findOne({userId: id}).then((user) => {
        if(!user){
            return {success: false, message: "No user found with that id"};
        }else{
            return User.findByIdAndUpdate(user.id,{$set: data},{new: true}).then((user) => {
                if(user){
                    return {success: true, message: user};
                }else{
                    return {success: false, message: "user update was not successful"};
                }
            })
            .catch((err) => {
                return {success: false, message: "an error occurred while updating user", error: err}
                })
        }
    })
    .catch((err) => {
        console.log(err);
        return {success: false, message: "an error occurred occurred while finding user", error: err}
    });
};

//Remove a user with a valid id
const RemoveUser = (id) => {
    return User.findOneAndDelete({userId: id}).then((user) => {
        if(user){
            return {success: true, message: "user successfully deleted"};
        }else{
            return {success: false, message: "user does not exit"};
        }
    })
    .catch((err) => {
        console.log(err);
        return {success: false, message: "an error occurred occurred while deleting user", error: err}
    });
};

module.exports = {AddUser, FetchUser, FetchAllUsers, EditUser, RemoveUser};

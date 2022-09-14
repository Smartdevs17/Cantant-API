const {ObjectId} = require("mongodb");
const {AddUser, FetchUser, FetchAllUsers, EditUser, RemoveUser} = require("../services/userService");

const CreateUser = async(req,res) => {
    try {
        const {firstName,lastName,email,password} = req.body;
        if(firstName && lastName && email && password.length > 6){
            const values = req.body;
            const newUser = await AddUser(values)
            const {success, message, error} = newUser;
            if(success){
                res.status(201).json({
                    success,
                    message: "user successfully created",
                    data: message
                })
            }else{
                res.status(422).json({
                    success,message,error
                })
            }
        }else{
            res.status(400).json({
                success: false,
                message: "bad request",
                error: "send the right data for opening of user acount"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }
};

const GetUser = async(req,res) => {
    try {
        const id = req.params.id;
        if(ObjectId.isValid(id)){
            const user = await FetchUser(id);
            const {success, message, error} = user;
            if(success){
                res.status(200).json({
                    success,
                    message: "user found",
                    data: message
                })
            }else{
                res.status(422).json({
                    success,message,error
                })
            }
        }else{
            res.status(400).json({
                success: false,
                message: "bad request",
                error: "send a valid id"
            }); 
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }
};

const GetAllUsers = async(req,res) => {
    try {
        const users = await FetchAllUsers();
        const {success, message, error} = users;
        if(success){
            res.status(200).json({
                success,
                message: "all users found",
                data: message
            })
        }else{
            res.status(422).json({
                success,message,error
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error
        });
    }
};

const UpdateUser = async(req,res) => {
    try {
        const id = req.params.id;
        const values = req.body;
        if(ObjectId.isValid(id) && values.toString().length > 0){
            const user = await EditUser(id,values);
            const {success, message, error} = user;
            if(success){
                res.status(200).json({
                    success,
                    message: "user updated successfully",
                    data: message
                })
            }else{
                res.status(422).json({
                    success,message,error
                })
            }
        }else{
            res.status(400).json({
                success: false,
                message: "bad request",
                error: "send a valid id"
            }); 
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }
};

const DeleteUser = async(req,res) => {
    try {
        const id = req.params.id;
        if(ObjectId.isValid(id)){
            const deletedUser = await RemoveUser(id);
            const {success, message, error} = deletedUser;
            if(success){
                res.status(200).json({
                    success,
                    message
                })
            }else{
                res.status(422).json({
                    success,message,error
                })
            }
        }else{
            res.status(400).json({
                success: false,
                message: "bad request",
                error: "send a valid id"
            }); 
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error
        });
    }
};

module.exports = {CreateUser, GetUser, GetAllUsers, UpdateUser, DeleteUser};
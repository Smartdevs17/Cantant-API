const router = require("express").Router();
const {CreateUser, GetUser, GetAllUsers, UpdateUser, DeleteUser} = require("../controllers/userController");


router.post("/", CreateUser);
router.get("/", GetAllUsers);
router.get("/:id", GetUser);
router.put("/:id/edit", UpdateUser);
router.delete("/:id/delete", DeleteUser);

module.exports = router;
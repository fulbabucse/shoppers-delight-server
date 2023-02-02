// Import Router from Express
const router = require("express").Router();

const userController = require("../controllers/usersController");
const tokenCheck = require("../middleware/tokenCheck");

router.get("/", tokenCheck, userController.getAllUsers);
router.put("/", userController.updateUser);

module.exports = router;

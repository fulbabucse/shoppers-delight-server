// Import Router from Express
const router = require("express").Router();

const userController = require("../controllers/usersController");

router.get("/", userController.getAllUsers);
router.put("/", userController.updateUser);

module.exports = router;

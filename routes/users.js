// Import Router from Express
const router = require("express").Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.getAllUsers);

module.exports = router;

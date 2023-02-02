// Import Router from Express
const router = require("express").Router();

const adminController = require("../controllers/adminController");
const tokenCheck = require("../middleware/tokenCheck");

router.get("/", tokenCheck, adminController.getAdmin);

module.exports = router;

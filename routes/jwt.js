// Import Router from Express
const router = require("express").Router();

// Controller
const tokenController = require("../controllers/tokenController");

// Token Route
router.get("/", tokenController.getToken);

// Export Router
module.exports = router;

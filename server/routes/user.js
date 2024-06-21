const { Router } = require("express");
const userController = require("../controllers/userController");
const { checkAuth } = require("../midleware/authToken");
const router = new Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout");
router.get("/me", checkAuth, userController.getMe);

module.exports = router;

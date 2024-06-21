const { Router } = require("express");
const { checkAuth } = require("../midleware/authToken");
const clientController = require("../controllers/clientController");
const router = new Router();

router.get("/get", checkAuth, clientController.getMyClients);
router.post("/create", checkAuth, clientController.create);
router.put("/change/:id", checkAuth, clientController.update);

module.exports = router;

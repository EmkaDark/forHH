const { Router } = require("express");
const loginRouter = require("./user");
const clientRouter = require("./clients");
const router = new Router();

router.use("/user", loginRouter);
router.use("/client", clientRouter);
module.exports = router;

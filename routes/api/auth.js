const router = require('express').Router();
const userController = require("../../controller/userController.js")



//api/auth
router.get('/list', userController.listar);

//api/user/signin
router.post("/signin", userController.signin);

router.post("/register", userController.register);

router.put("/update", userController.update);

module.exports = router;
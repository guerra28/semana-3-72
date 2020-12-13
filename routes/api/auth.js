const router = require('express').Router();
const userController = require("../../controller/userController.js")
const db = require("../../models")


//api/auth
router.get('/', (req, res) => {
    db.user.findAll().then(users => res.json(users))
});

//api/user/signin
router.post("/signin", userController.signin)

module.exports = router;
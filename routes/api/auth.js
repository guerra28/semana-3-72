const router = require('express').Router();
const userController = require("../../controller/userController.js")
const db = require("../../models")


//api/auth
router.get('/', (req, res) => {
    db.user.findAll().then(users => res.json(users))
});



//router.use("/auth", apiRouterUser)

//api/user/signin
router.post("/signin", userController.signin)


router.post('/register', async(req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const user = await db.User.create(req.body);
    res.status(200).json(user);


});



module.exports = router;
const router = require('express').Router();
const apiRouterUser = require('./api/auth.js')



//api/auth
router.use("/auth", apiRouterUser)




module.exports = router;
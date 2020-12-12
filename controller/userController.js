const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../secret/config.js")



exports.signin = async(req, res, next) => {
    try {
        const user = await db.user.findOne({ where: { email: req.body.email } })

        if (user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {

                const token = jwt.sign({ id: user.id, name: user.name, email: user.email },
                    config.secret, {
                        expiresIn: 86400
                    });

                res.status(200).send({
                    auth: true,
                    accessToken: token,
                    user: user
                });


            } else {

                res.status(401).send('Usuario o contraseña incorrectos');

            }

        } else {

            res.status(404).send('Usuario o contraseña incorrectos');


        }

    } catch (error) {
        res.status(500).send({
            message: 'No se puede logar->'
        });
        next(error);
    }
}
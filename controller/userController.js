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

exports.register = async(req, res, next) => {
    try {

        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            res.status(409).send({
                message: 'El email ya existe'
            });
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await db.user.create(req.body);
            res.status(200).json(user);
        }


    } catch (error) {
        res.status(500).send({
            message: ' Error->'
        });

        next(error)
    }
}


exports.listar = async(req, res, next) => {

    try {

        const user = await db.user.findAll();

        if (user) {

            res.status(200).json(user);

        } else {
            res.status(404).send({
                message: 'Ususario no encontrado'
            });

        }


    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        });
        next(error);
    }

}

exports.update = async(req, res, next) => {

    try {

        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {

            const user = await db.user.update({
                name: req.body.name
            }, {
                where: {
                    email: req.body.email
                }
            });
            res.status(200).json(user);

        } else {

            res.status(404).send({
                message: 'Usuario no econtrado'
            });

        }

    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        });
        next(error)
    }


}
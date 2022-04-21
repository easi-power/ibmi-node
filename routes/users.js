const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require('express-validator');
const connection = require('../models/sequelize-connection').connection;

const validations = [
    body('firstname').trim().not().isEmpty().withMessage('The firstname field is required'),
    body('lastname').trim().not().isEmpty().withMessage('The lastname field is required'),
    body('email').trim().not().isEmpty().withMessage('The email field is required'),
];

router.route('/')
    .get((req, res) => {
        // User.findAll()
        //     .then((users) => {
        //         res.status(200).send(users);
        //     }).catch((err) => {
        //         res.status(500).send(err);
        //     });
        connection.query('select firstname, lastname, email, phone from userstest;')
                    .then((users) => {
                res.status(200).send(users);
            }).catch((err) => {
                res.status(500).send(err);
            });
    })
    .post(validations, (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        let user = new User();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;

        user.save();
		res.status(201).send(user);
    });

router.use('/:user_id', (req, res, next) => {
    User.findByPk(req.params.user_id)
        .then((user) => {
            if(user) {
                req.user = user;
                next();
            } else {
                res.status(404).send("user not found");
            }
        }).catch((err) => {
            res.status(500).send(err);
        })
});

router.route('/:user_id')
    .get((req, res) => {
        console.log('enter here');
        res.status(200).send(req.user);
    })
    .put(validations, (req, res) => {
        const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status('422').json({ errors: errors.array() });
		}
        let user = req.user;
        user.update(req.body);
        user.save();

        res.status(202).send(user);
    })
    .delete((req, res) => {
        req.user.destroy()
            .then(() => res.status(204).send())
            .catch(err => res.status(500).send(err));
    });


module.exports = router;
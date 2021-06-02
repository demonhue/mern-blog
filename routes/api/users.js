const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//Article Model
const User = require('../../models/user');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    //check for existing user
    await User.findOne({ email })
        .then((user) => {
            if (user) return res.status(400).json({ msg: "There's already a user with this email" });
            const newUser = new User({
                name,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            //three parameters, one optional
                            jwt.sign(
                                { id: user.id, email:user.email, name:user.name },//payload
                                config.get('jwtSecret'),//secret
                                { expiresIn: 3600 },//optional expire in 3600 seconds
                                (err, token) => {
                                    if (err) throw err;

                                    res
                                        .header("x-auth-token", token)
                                        .header("access-control-expose-headers", "x-auth-token")
                                        .json({
                                        user: {
                                            id: user._id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                    })
                })
            })
        })
});

module.exports = router;
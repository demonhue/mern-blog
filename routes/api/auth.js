const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//Article Model
const User = require('../../models/user');

// @route POST api/auth
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const {email, password } = req.body;

    //check for existing user
    User.findOne({ email })
        .then((user) => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            //Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {//return a boolean
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credential' });

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
});

// @route POST api/auth
// @desc Register new user
// @access Public
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

module.exports = router;
// CALL packages
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

// CALL models
const User = require('../models/user.js');

// CALL helpers
const validators = require('./config/validators.js');


// INITIALISE router
const router = express.Router();


// ROUTES
router.get('/', async (req, res) => {
    try {
        usersList = await User.find();
        res.json(usersList);
    }
    catch (err){
        res.json({message: err});
    }
});

router.post('/register', async (req, res) => {
    // VALIDATION
    const { error } = validators.login.validate(req.body);
    if (error) return res.send(error.details[0].message);

    // CHECK if username is unique
    const usernameExists = await User.findOne({username: req.body.username});
    if (usernameExists) return res.status(400).send('username already exists')

    // HASH password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // SAVE user
    newUser = new User({
        username: req.body.username,
        password: hashedPassword
    });
    newUser.save()
    .then(newUser => res.json(newUser))
    .catch(err => res.json({message: err}));
});

router.post('/login', async (req, res) => {
    // VALIDATION
    const { error } = validators.login.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK if email exists
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send('Username may be wrong');

    // COMAPRE passwords
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password may be wrong');

    // CREATE and assign a token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET, {});
    res.header('auth-token', token).send(token);
});

// EXPORT router
module.exports = router

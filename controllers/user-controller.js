const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationCheck } = require('../utils/utils');

exports.login = async (req, res, next) => {
    console.log('login');

    const email = req.body.email;
    const pass = req.body.pass;
    try {
        //check exists
        const result = await User.findOne({ email });
        if (!result) {
            const error = new Error('Error with login. Check and try again.');
            error.statusCode = 401;
            return next(error);
        }
        // check pass
        const checkPass = await bcrypt.compare(pass, result.pass);
        if (!checkPass) {
            const error = new Error(`Can't login with email/pass. Please check and try again.`);
            error.statusCode = 401;
            return next(error);
        }
        // create web token
        const token = jwt.sign({ email: result.email, userId: result._id.toString() }, process.env.JWT_KEY, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'user login', token, userId: result._id.toString(), email });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            next(error);
        }
    }
};

exports.addUser = async (req, res, next) => {
    console.log('add user');
    const error = validationCheck(validationResult(req));
    if (error) {
        console.log(error);
        // return a next error rather than throwing. This is due to the async code
        return next(error);
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const pass = req.body.pass;
    try {
        const hashedpass = await brypt.hash(pass, 12);
        const user = new User({
            firstName,
            lastName,
            email,
            pass: hashedpass,
        });
        const newUser = await user.save();
        console.log('Successful sign up! ' + newUser._id);
        res.status(200).json({ message: 'add user', userId: newUser._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.editUser = (req, res, next) => {
    console.log('edit user');
    res.status(200).json({ message: 'edit user' });
};

exports.deleteUser = (req, res, next) => {
    console.log('delete user');
    res.status(200).json({ message: 'delete user' });
};

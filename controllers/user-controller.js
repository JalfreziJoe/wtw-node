const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationCheck } = require('../utils/utils');
const httpError = require('../utils/httpError');

exports.login = async (req, res, next) => {
    console.log('login');

    const email = req.body.email;
    const pass = req.body.pass;
    try {
        //check exists
        const result = await User.findOne({ email });
        if (!result) {
            return next(new httpError('Error with login. Check and try again.', 401));
        }
        // check pass
        const checkPass = await bcrypt.compare(pass, result.pass);
        if (!checkPass) {
            return next(
                new httpError(`Can't login with email/pass. Please check and try again.`, 401)
            );
        }
        // create web token
        const token = jwt.sign(
            { email: result.email, userId: result._id.toString() },
            process.env.JWT_KEY,
            {
                expiresIn: '1h',
            }
        );
        res.status(200).json({
            message: 'user login',
            token,
            userId: result._id.toString(),
            email,
        });
    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

exports.addUser = async (req, res, next) => {
    console.log('add user');
    const error = validationCheck(validationResult(req));
    if (error) {
        console.log(error);
        // return a next error rather than throwing. This is due to the async code
        return next(new httpError(error.message, error.statusCode || 500));
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
        next(new httpError(err.message, err.statusCode || 500));
    }
};

exports.editUser = async (req, res, next) => {
    console.log('edit user');
    // get user details
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    // find user on DB
    const user = await User.findById(req.userId);
    // no user found
    if (!user) {
        return next(new httpError('User not found', 404));
    }
    // check first and last names. Update as appropiate
    if (user.firstName !== newFirstName) {
        user.firstName = newFirstName;
    }
    if (user.lastName !== newLastName) {
        user.lastName = newLastName;
    }
    try {
        await user.save();
    } catch (error) {
        return next(new httpError('Error updating user', 422));
    }
    res.status(200).json({
        message: 'edit user success',
        userId: req.userId,
        newFirstName: user.firstName,
        newLastName: user.lastname,
    });
};

exports.deleteUser = async (req, res, next) => {
    console.log('delete user');
    // get userId from body
    const confirmUserId = req.body.userId;
    // compare token userId and userId on body
    if (req.userId !== confirmUserId) {
        return next(new httpError('No authorization', 403));
    }
    try {
        // find user on DB
        const user = await User.findById(req.userId);
        // if no user found
        if (!user) {
            return next(new httpError('User not found', 404));
        }
        // user deletion
        const res = await User.findByIdAndDelete(confirmUserId);
        res.status(200).json({ message: 'delete user completed', userId: confirmUserId });
    } catch (error) {
        next(new httpError('Error deleting user', 500));
    }
};

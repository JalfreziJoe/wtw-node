const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body } = require('express-validator');

const userController = require('../controllers/user-controller');

router.post(
    '/login',
    [body('email').isEmail().normalizeEmail(), body('pass').isLength({ min: 5 }).isAlphanumeric().trim()],
    userController.login
);

router.post(
    '/add-user',
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .custom(async emailAddr => {
                const user = await User.findOne({ email: emailAddr });
                if (user) {
                    return Promise.reject('Error signing up');
                }
            }),
        body('firstName').not().isEmpty().trim().escape(),
        body('lastName').not().isEmpty().trim().escape(),
        body('pass').isLength({ min: 5 }).isAlphanumeric().trim(),
    ],
    userController.addUser
);

router.patch('/:userId', userController.editUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;

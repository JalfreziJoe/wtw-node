const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.post('/login', userController.login);

router.post('/add-user', userController.addUser);

router.patch('/:userId', userController.editUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Not protect from any users
router.post('/signup', userController.signup);
router.post('/login', authController.login);
// router.get('/logout', authController.logout);

// Protect all routes after this middleware
// router.use(authController.protect);

// router.get('/useremail/:email', userController.getUserByEmail);

// router
//     .route('/:id')
//     .get(userController.getUser)
//     .put(decryptController.getDecryptedData, userController.updateUser);

module.exports = router;
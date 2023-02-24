const router = require('express').Router();
const { showOwner, updateUserData } = require('../controllers/users');
const { checkChangedUserData } = require('../middlewares/validation');

router.get('/me', showOwner);
router.patch('/me', checkChangedUserData, updateUserData);

module.exports = router;

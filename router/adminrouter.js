const express = require('express');

const router = express.Router();

const passport = require('passport')

const admincontroller = require('../controller/admincontroller');

const Student = require('../model/student')

router.get('/loginfail', (req, res) => {
    return res.json({ status: 400, msg: "enter valide password" })
})

router.post('/adddata', admincontroller.adddata);

router.get('/getdata', passport.authenticate('jwt', { failureRedirect: '/loginfail' }), admincontroller.getdata);

router.delete('/DeleteData/:id', admincontroller.DeleteData);

router.put('/UpdateData/:id', admincontroller.UpdateData);

router.post('/login', admincontroller.login);

router.post('/allrecord', Student.uploadAvatar, admincontroller.allrecord);

router.use('/faculty', require('../router/api/v1/faculty/facultyrouter'));

router.use('/StudentD', require('../router/api/v1/studentrouter'))

module.exports = router;
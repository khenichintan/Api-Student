const express = require('express');

const router = express.Router();

const passport = require('passport');

const facultycontroller = require('../../../../controller/api/v1/faculty/facultycontroller');

router.get('/loginfail', async(req, res) => {
    return res.json({ status: 500, msg: "login frist" })
})

router.post('/facultyregister', passport.authenticate('jwt', { failureRedirect: '/faculty/loginfail' }), facultycontroller.facultyregister);

router.post('/facultylogin', facultycontroller.facultylogin);

router.get('/GetfacultyData', passport.authenticate('jwt', { failureRedirect: '/faculty/loginfail' }), facultycontroller.GetfacultyData)

router.get('/myprofile', passport.authenticate('faculty', { failureRedirect: '/faculty/loginfail' }), facultycontroller.myprofile);

module.exports = router;
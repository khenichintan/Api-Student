const faculty = require('../../../../model/faculty');
const jwt = require('jsonwebtoken');

module.exports.facultyregister = async(req, res) => {
    // console.log("register");
    try {
        req.body.role = 'faculty'
        if (req.body.password == req.body.conformpassword) {
            let chackemail = await faculty.findOne({ email: req.body.email })
            if (chackemail) {
                return res.json({ status: 500, msg: "record already add" })
            } else {
                let data = await faculty.create(req.body)
                if (data) {
                    return res.json({ status: 200, msg: "record add" })
                } else {
                    return res.json({ status: 400, msg: "record already add" })
                }
            }
        } else {
            return res.json({ status: 400, msg: "password is not mach" })
        }
    } catch (error) {
        console.log(error, "facultyregister");
    }
};

module.exports.facultylogin = async(req, res) => {
    let chackemail = await faculty.findOne({ email: req.body.email });
    if (chackemail) {
        if (chackemail.password == req.body.password) {
            let token = jwt.sign({ data: chackemail }, "kheni", { expiresIn: 84600 });
            return res.json({ "status": 200, "msg": token });
        } else {
            return res.json({ "status": 500, "msg": "invalid enterd data" });
        }
    } else {
        return res.json({ "status": 500, "msg": "data not available" });
    }
};

module.exports.GetfacultyData = async(req, res) => {
    // let data = await faculty.find({});
    // return res.json({status:200,"msg":data});
    return res.redirect('/faculty/myprofile');
};

module.exports.myprofile = async(req, res) => {
    return res.json({ status: 200, "msg": req.user });
};
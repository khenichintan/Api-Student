const admin = require('../model/adminmodel');
const jwt = require('jsonwebtoken');
const Student = require('../model/student');

module.exports.adddata = async(req, res) => {
    try {
        console.log(req.body);

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        req.body.role = 'admin'
        let chackdata = await admin.findOne({ email: req.body.email });
        if (chackdata) {
            return res.json({ status: 200, msg: "data not add" })
        } else {
            await admin.create(req.body)
            return res.json({ status: 500, msg: "data  add" })
        }
    } catch (error) {
        console.log(error, "add data");
    }
};

module.exports.getdata = async(req, res) => {
    try {

        if (req.query.status == 'deActive') {
            let Active = await recent.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await recent.findByIdAndUpdate(req.query.id, { isActive: true });
        }

        let data = await admin.find({});
        return res.json(data)
    } catch (error) {
        console.log(error, "getdata");
    }
};

module.exports.DeleteData = async(req, res) => {
    try {
        let data = await admin.findById(req.params.id);
        if (data) {
            let deletedata = await admin.findByIdAndDelete(data.id)
            if (deletedata) {
                return res.json({ status: 200, msg: "data delete" })
            } else {
                return res.json({ status: 500, msg: "delete" })
            }
        } else {
            return res.json({ status: 500, msg: "delete not data" })
        }
    } catch (error) {
        console.log(error, "delete");
    }
};

module.exports.UpdateData = async(req, res) => {
    try {
        let data = await admin.findById(req.params.id);
        // console.log(data);
        if (data) {
            let dataupdate = await admin.findByIdAndUpdate(data.id, req.body)
            if (dataupdate) {
                return res.json({ status: 200, msg: "data is update" })
            } else {
                return res.json({ status: 500, msg: "data not update" })
            }
        } else {
            return res.json({ status: 500, msg: "data is not update" })
        }
    } catch (error) {
        console.log(error, "updata");
    }
};

module.exports.login = async(req, res) => {
    try {
        let chackemail = await admin.findOne({ email: req.body.email })
        if (chackemail) {
            if (chackemail.password == req.body.password) {
                let token = jwt.sign({ data: chackemail }, "kheni", { expiresIn: 85200 });
                console.log(token)
                return res.json({ status: 200, msg: token })
            } else {
                return res.json({ status: 500, msg: "invalide enterd data" })
            }
        } else {
            return res.json({ status: 500, msg: "data not available" })
        }
    } catch (error) {
        console.log(error, "login");
    }
};

module.exports.allrecord = async(req, res) => {
    // console.log(req.body);
    // console.log(req.files);
    try {
        var singleimage = '';
        if (req.files.image) {
            singleimage = Student.singlepath + '/' + req.files.image[0].filename;
        }
        req.body.image = singleimage;

        var multiimage = [];
        if (req.files.multimage) {
            for (var i = 0; i < req.files.multimage.length; i++) {
                multiimage.push(Student.multimagepath + '/' + req.files.multimage[i].filename)
            }
        }
        req.body.multimage = multiimage;

        let chack = await Student.findOne({ email: req.body.email })
        if (chack) {
            return res.json({ status: 500, msg: "already add" })
        }
        let data = await Student.create(req.body)
        if (data) {
            return res.json({ status: 200, msg: "student add" })
        } else {
            return res.json({ status: 500, msg: "student already add" })
        }
    } catch (error) {
        console.log(error, "student");
    }
}
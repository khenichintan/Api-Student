const faculty = require('../../../model/faculty');
const StudentD = require('../../../model/studentD');

module.exports.studentregister = async(req, res) => {
    try {
        req.body.role = "Student"
        let studData = await StudentD.create(req.body)
        let facdata = await faculty.findById(studData.faculty_id);
        await facdata.student_id.push(studData.id);
        await faculty.findByIdAndUpdate(studData.faculty_id, { student_id: facdata.student_id });
        if (studData) {
            return res.json({ status: 200, msg: "student data added successfully" });
        } else {
            return res.json({ status: 500, msg: 'something wrong' });
        }
    } catch (error) {
        console.log(error);
    }
}
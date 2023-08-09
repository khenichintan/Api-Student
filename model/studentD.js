const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    faculty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculty',
        require: true
    }
})

const StudentD = mongoose.model('StudentD', studentSchema);
module.exports = StudentD;
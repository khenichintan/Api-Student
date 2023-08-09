const mongoos = require('mongoose');

const facultySchema = mongoos.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    student_id: {
        type: Array,
        ref: 'StudentD',
        require: true
    }
});

const faculty = mongoos.model('faculty', facultySchema);

module.exports = faculty;
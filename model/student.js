const mongoos = require('mongoose');

const singlepath = "/upload/singleimage"
const multimagepath = "/upload/multimage"

const multer = require('multer')

const path = require('path')

const StudentSchema = mongoos.Schema({
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
        gender: {
            type: String,
            required: true
        },
        hobby: {
            type: Array,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        des: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        multimage: {
            type: Array,
            required: true
        }
        // isActive: {
        //     type: Boolean,
        //     required: true
        // },
        // createdAt: {
        //     type: String,
        //     required: true
        // },
        // updatedAt: {
        //     type: String,
        //     required: true
        // }
    }
    // , {
    //     timestamps: true
    // }
);

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        // cd(null, path.join(__dirname, '..', singlepath))
        if (file.fieldname == 'image') {
            cd(null, path.join(__dirname, '..', singlepath))
        } else {
            cd(null, path.join(__dirname, '..', multimagepath))
        }
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

StudentSchema.statics.uploadAvatar = multer({ storage: storage }).fields([{ name: "image", maxCount: 1 }, { name: "multimage", maxCount: 5 }]);
StudentSchema.statics.singlepath = singlepath;
StudentSchema.statics.multimagepath = multimagepath;

const Student = mongoos.model('Student', StudentSchema);

module.exports = Student;
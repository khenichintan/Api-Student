const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/Apinode");

const db = mongoose.connection;

db.once('open', (err) => {
    if (err) {
        console.log(err)
        return false
    } else {
        console.log("Db is running")
    }
});

module.exports = db;
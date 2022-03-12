const mongoose = require("mongoose");
require('dotenv').config();

class Database {
    constructor() {
        this.connection = null;
    }

    connect () {
        console.log("Connecting to database...");

        mongoose.connect(String(process.env.MONGO_URI), {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }).then(() => {
            console.log("connected to the Database.");
            this.connection = mongoose.connection;
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = Database;
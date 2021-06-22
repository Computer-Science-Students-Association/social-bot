"use strict";

const mongoose = require("mongoose");

module.exports = async function() {
    try {
        await mongoose.connect("mongodb://localhost:27017/sessions", {
            user: "devDeclan",
            pass: "349211",
            authSource: "admin",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(function() {
            console.log("database connected successfully")
        })
    }
    catch(err) {
        throw err
    }
}
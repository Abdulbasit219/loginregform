const mongoose = require('mongoose');

const DataBase = process.env.DATABASE;

mongoose.connect(
    DataBase,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to database");
    }).catch(() => {
        console.log("Error connecting to database");
    });

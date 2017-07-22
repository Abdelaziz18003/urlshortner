"use strict"

let NODE_ENV = process.env.NODE_ENV.trim(),
    DB_URI = "",
    APP_URI = "",
    PORT = "";

if (NODE_ENV == "development") {
    require("dotenv").config();
    DB_URI = process.env.DB_URI_DEV;
    APP_URI = process.env.APP_URI_DEV;
    PORT = process.env.PORT_DEV;

} else if (NODE_ENV == "production") {
    DB_URI = process.env.DB_URI;
    APP_URI = process.env.APP_URI;
    PORT = process.env.PORT;
}

console.log(DB_URI)
module.exports = {
    NODE_ENV,
    DB_URI,
    APP_URI,
    PORT
}
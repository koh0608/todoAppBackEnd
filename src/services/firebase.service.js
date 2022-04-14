"use strict";
exports.__esModule = true;
exports.init = void 0;
var firebase_admin_1 = require("firebase-admin");
// import serviceAccount from 'configs/firebase-service-account.json';
var serviceAccount = require('configs/firebase-service-account.json');
var init = function () {
    firebase_admin_1["default"].initializeApp({
        credential: firebase_admin_1["default"].credential.cert(serviceAccount)
    });
};
exports.init = init;

const express = require("express");
const adminController = require("../controllers/admins");

const Router = express.Router();

Router.get("/", adminController.getAllAdmins); 
Router.post("/login", adminController.validateLogin);
Router.post("/add-admin", adminController.addNewAdmin); 

module.exports = Router;

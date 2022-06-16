const express = require("express");
const linksController = require("../controllers/links");

const Router = express.Router();

Router.get("/", linksController.getAllLinks); 
Router.post("/add-link", linksController.addNewLink); 

module.exports = Router;

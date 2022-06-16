const express = require("express");

const linksController = require("../controllers/links");



const Router = express.Router();

Router.get("/", linksController.getAllLinks);   // returns all rooms
Router.post("/add-link", linksController.addNewLink); // add a new room    
  // To get all items in cart

// Router.get("/", roomsController.newBooking);
// Router.get("/", roomsController.viewBooking);

module.exports = Router;

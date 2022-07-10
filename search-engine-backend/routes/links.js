const express = require("express");
const linksController = require("../controllers/links");

const Router = express.Router();

Router.get("/", linksController.getAllLinks);
Router.post("/search", linksController.getSearchLinks);
Router.post("/search-AND", linksController.getSearchLinksAND);
Router.post("/search-OR", linksController.getSearchLinksOR);
Router.post("/search-NOT", linksController.getSearchLinksNOT); 
Router.post("/add-link", linksController.addNewLink);
Router.put("/update-hits", linksController.updateLinkCount)
Router.put("/delete", linksController.deleteLink); 

module.exports = Router;

const mongoose = require("mongoose");


const Links = require("../models/Links");

const getAllLinks = (req, res) => {
  Links.find({}, function (err, results) {
    if (err) {
      throw err;
    } else {
      //const results1 = results.filter((result) => result.deleted === false)
      res.json(results);
    }
  });
};

const addNewLink = (req, res) => {


  const newLink = new Links({
    link_name: req.body.link_name,
    link_address: req.body.link_address,
    description: req.body.description
  });

  newLink
  .save()
  .then(function (links) {
    res.json({ message: "Success", status: "ok" });
  })
  .catch(function (err) {
    throw err;
  });
};




module.exports.getAllLinks = getAllLinks;
module.exports.addNewLink = addNewLink;


const mongoose = require("mongoose");


const Links = require("../models/Links");

const getAllLinks = (req, res) => {
  Links
    .find({}, function (err, results) {
      if (err) {
        throw err;
      } else {
        res.json(results);
      }
    });
};

const getSearchLinks = (req, res) => {
  const { queryString } = req.body
  const queryRegEx = '.*' + queryString + '.*';

  Links
    .find({ description: { $regex: queryRegEx, $options: 'i' }}, function(err, results) {
      if(err) {
        throw err
      } else {
        res.json(results)
      }
    })
}

const getSearchLinksNOT = (req, res) => {
  const { queryString } = req.body
  const queryRegEx = '.*' + queryString + '.*';

  Links
    .find({ description: { $not: { $regex: queryRegEx, $options: 'i' }}}, function(err, results) {
      if(err) {
        throw err
      } else {
        res.json(results)
      }
    })
}

const getSearchLinksAND = (req, res) => {
  const { queryString1, queryString2 } = req.body
  const queryRegEx1 = '.*' + queryString1 + '.*';
  const queryRegEx2 = '.*' + queryString2 + '.*';

  Links.find({
    $and: [
      { description: { $regex: queryRegEx1, options: 'i' }},
      { description: { $regex: queryRegEx2, options: 'i' }}
    ]
  }, function(err, results) {
    if(err) {
      throw err
    } else {
      res.json(results)
    }
  })
}

const getSearchLinksOR = (req, res) => {
  const { queryString1, queryString2 } = req.body
}


const addNewLink = (req, res) => {
  const newLink = new Links({
    link_name: req.body.link_name,
    link_address: req.body.link_address,
    description: req.body.description,
  });

  newLink
    .save()
    .then(function (link) {
      res.json({ message: "Success", status: "ok" });
    })
    .catch(function (err) {
      throw err;
    });
};

module.exports.getAllLinks = getAllLinks;
module.exports.getSearchLinks = getSearchLinks;
module.exports.getSearchLinksAND = getSearchLinksAND;
module.exports.getSearchLinksOR = getSearchLinksOR;
module.exports.getSearchLinksNOT = getSearchLinksNOT;
module.exports.addNewLink = addNewLink;


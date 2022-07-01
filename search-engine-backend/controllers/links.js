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
    .find({ link_name: { $regex: queryRegEx, $options: 'i' }}, function(err, results) {
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
    .find({ link_name: { $not: { $regex: queryRegEx, $options: 'i' }}}, function(err, results) {
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
      { link_name: { $regex: queryRegEx1, options: 'i' }},
      { link_name: { $regex: queryRegEx2, options: 'i' }}
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
  const queryRegEx1 = '.*' + queryString1 + '.*';
  const queryRegEx2 = '.*' + queryString2 + '.*';

  Links.find({
    $or: [
      { link_name: { $regex: queryRegEx1, options: 'i' }},
      { link_name: { $regex: queryRegEx2, options: 'i' }}
    ]
  }, function(err, results) {
    if(err) {
      throw err
    } else {
      res.json(results)
    }
  })
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

const deleteLink = (req, res) => {
  const id = req.params.id
  res.json({ id: id })
  // write delete logic here
}

module.exports.getAllLinks = getAllLinks;
module.exports.getSearchLinks = getSearchLinks;
module.exports.getSearchLinksAND = getSearchLinksAND;
module.exports.getSearchLinksOR = getSearchLinksOR;
module.exports.getSearchLinksNOT = getSearchLinksNOT;
module.exports.addNewLink = addNewLink;
module.exports.deleteLink =  deleteLink;

const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const getAllAdmins = (req, res) => {
  Admin.find({}, function (err, results) {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
};

const addNewAdmin = (req, res) => {
  const newAdmin = new Admin({
    username: req.body.username,
    password: req.body.password,
  });

  newAdmin
    .save()
    .then(function (link) {
      res.json({ message: "Success", status: "ok" });
    })
    .catch(function (err) {
      throw err;
    });
};

const validateLogin = (req, res) => {
    const { username, password } = req.body;

    Admin
        .findOne({ username: username })
        .then((admin) => {
          if (!admin) {
            return res.json({ status: "fail", message: "Admin not found" });
          }
  
          if(admin.password === password) {
              return res.json({
                username: admin.username,
                status: "ok",
              });
          } else {
              return res.json({ status: "fail", message: "Incorrect Password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
}

module.exports.getAllAdmins = getAllAdmins;
module.exports.addNewAdmin = addNewAdmin;
module.exports.validateLogin = validateLogin;


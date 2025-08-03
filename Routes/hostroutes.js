const express = require("express");
const hostroute = express.Router();
const path = require("path");
const hostController = require("../controller/hostController");
const { homearr } = require("../controller/home");

// hostroute.get(
//   "/add-home",
//   (req, res, next) =>
//     res.sendFile(path.join(__dirname, "../", "views", "add_home.html")) //form action should contain /host if using common path
// );

// REPLACED CODE

// hostroute.post("/add-home", (req, res, next) => {
//   homearr.push({ HOUSENAME: req.body.Housename });
//   console.log(req.body),
//     res.sendFile(path.join(__dirname, "../", "views", "home_added.html"));
// });

// hostroute.get("/add-home", (req, res, next) =>
//   res.render("add_home", { Pagetitle: "ADD-HOME" })
// ); //form action should contain /host if using common path

//REPLACED CODE

hostroute.get("/add-home", hostController.getAddHome);
hostroute.post("/add-home", hostController.postAddHome);
hostroute.get("/hostlist", hostController.getHostHomeList);
hostroute.get("/edit-home/:homeId", hostController.getEditHomeList);
hostroute.post("/edit-home", hostController.postEditHome);
hostroute.post("/delete-home/:homeId", hostController.postDeleteHome);

// hostroute.post("/add-home", (req, res, next) => {
//   homearr.push({
//     DETAILS: JSON.stringify(req.body),
//   });
//   console.log(req.body), res.render("home_added", { Pagetitle: "HOME ADDED" });
// });// for all details

module.exports = hostroute;

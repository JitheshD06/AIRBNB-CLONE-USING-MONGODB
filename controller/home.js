// const Home = require("../models/home");
// exports.getAddHome = (req, res, next) =>
//   res.render("host/add_home", { pageTitle: "ADD-HOME" });

// // exports.gethomeadded = (req, res, next) => {
// //   homearr.push({ HOUSENAME: req.body.Housename }),
// //     console.log(req.body),
// //     res.render("home_added", { Pagetitle: "HOME ADDED" });
// // };

// //REPLACED CODE

// exports.postAddHome = (req, res, next) => {
//   const { houseName, price, location, rating, photoUrl } = req.body;
//   const home = new Home(houseName, price, location, rating, photoUrl);
//   home.save();

//   res.render("host/home_added", {
//     pageTitle: "Home Added Successfully",
//   });
// };

// exports.getHome = (req, res, next) => {
//   Home.find()((homearr) => {
//     console.log("Homes available:", homearr);
//     res.render("store/home", {
//       homearr: homearr,
//       pageTitle: "HOME_PAGE",
//     });
//   });
// };

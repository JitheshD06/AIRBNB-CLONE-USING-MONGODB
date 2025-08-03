const express = require("express");
const storeRouter = express.Router();
const path = require("path");
const { homearr } = require("./hostroutes");
const storeController = require("../controller/storeController");

// // userroutes.get(
// //   "/",
// //   (req, res, next) =>
// //     res.send(`WELCOME TO AIRBNB <br>
// //   <a href="/host/add-home">ADD HOME </a>`) //only one res.send can be used to in one path
// // );

// // REPLACED CODE

// // userroutes.get("/", (req, res, next) => {
// //   console.log(Homes);
// //   res.sendFile(path.join(__dirname, "../", "views", "home.html"));
// // });

// // REPLACED CODE

storeRouter.get("/", storeController.getHome);
storeRouter.get("/Bookings", storeController.bookings);
storeRouter.get("/home-list", storeController.getHomeList);
storeRouter.get("/home/:homeid", storeController.getHomeDetails);
// storeRouter.get("/favourites", storeController.getFavouriteList);
// storeRouter.post("/favourites", storeController.postAddToFavourite);
// storeRouter.post(
//   "/favourites/delete/:homeId",
//   storeController.postRemoveFromFavourite
// );
module.exports = storeRouter;

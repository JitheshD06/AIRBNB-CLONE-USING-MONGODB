const Home = require("../models/home");
const Favourite = require("../models/favourites");

exports.getHome = (req, res, next) => {
  Home.find()
    .then((homes) => {
      console.log("Homes available:", homes);
      res.render("store/home", {
        homearr: homes,
        pageTitle: "HOME_PAGE",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error fetching homes:", error);
      res.status(500).render("error", {
        pageTitle: "Error",
        error: "Failed to fetch homes",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.bookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "BOOKING-PAGE",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getHomeList = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("store/home-list", {
        homearr: homes,
        pageTitle: "HOME-LIST",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error fetching home list:", error);
      res.status(500).render("error", {
        pageTitle: "Error",
        error: "Failed to fetch home list",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeid; // Note: using homeid to match your route

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found");
        return res.redirect("/");
      }

      console.log("Home details:", home);
      res.render("store/home-detail", {
        pageTitle: "HOME DETAILS",
        home: home,
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error fetching home details:", error);
      res.redirect("/");
    });
};

exports.getHomeDes = (req, res, next) => {
  const homeid = req.params.homeid;

  Home.findById(homeid)
    .then((home) => {
      if (!home) {
        console.log("Home not found");
        return res.redirect("/home");
      }

      console.log("Home ID:", homeid);
      res.render("store/home-detail", {
        pageTitle: "HOME",
        home: home,
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error fetching home details:", error);
      res.redirect("/home");
    });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .then((favourites) => {
      const favouriteHomeIds = favourites.map((fav) => fav.homeId);
      return Home.find({ _id: { $in: favouriteHomeIds } });
    })
    .then((favouriteHomes) => {
      res.render("store/favourite", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error fetching favourites:", error);
      res.status(500).render("error", {
        pageTitle: "Error",
        error: "Failed to fetch favourites",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const favourite = new Favourite({ homeId });

  favourite
    .save()
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((error) => {
      console.error("Error adding to favourites:", error);
      res.redirect("/favourites");
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favourite.deleteOne({ homeId })
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((error) => {
      console.error("Error removing from favourites:", error);
      res.redirect("/favourites");
    });
};

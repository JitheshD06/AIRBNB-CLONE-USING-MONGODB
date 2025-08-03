const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "ADD-HOME",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;

  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
  });

  home
    .save()
    .then(() => {
      res.render("host/home_added", {
        pageTitle: "Home Added Successfully",
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error adding home:", error);
      res.status(500).render("error", {
        pageTitle: "Error",
        error: "Failed to add home",
        isLoggedIn: req.session.isLoggedIn,
      });
    });
};

exports.getHostHomeList = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("host/host_list", {
        homearr: homes,
        pageTitle: "HOSTS-HOMELIST",
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error fetching homes:", error);
      res.status(500).render("error", {
        pageTitle: "Error",
        error: "Failed to fetch homes",
        isLoggedIn: req.session.isLoggedIn,
      });
    });
};

exports.getEditHomeList = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found");
        return res.redirect("/host/hostlist");
      }

      console.log("Edit home data:", homeId, editing, home);

      res.render("host/edit-home", {
        pageTitle: editing ? "Edit Home" : "ADD-HOME",
        editing: editing,
        home: home,
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error fetching home for edit:", error);
      res.redirect("/host/hostlist");
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;

  Home.findByIdAndUpdate(
    id,
    {
      houseName,
      price,
      location,
      rating,
      photoUrl,
      description,
    },
    { new: true, runValidators: true }
  )
    .then((updatedHome) => {
      if (!updatedHome) {
        console.log("Home not found for update");
        return res.redirect("/host/hostlist");
      }

      res.redirect("/host/hostlist");
    })
    .catch((error) => {
      console.error("Error updating home:", error);
      res.redirect("/host/hostlist");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Deleting home with ID:", homeId);

  Home.findByIdAndDelete(homeId)
    .then((deletedHome) => {
      if (!deletedHome) {
        console.log("Home not found for deletion");
      }

      res.redirect("/host/hostlist");
    })
    .catch((error) => {
      console.error("Error while deleting home:", error);
      res.redirect("/host/hostlist");
    });
};

//External module
const express = require("express");
const mongoose = require("mongoose");
//Local module
const storeRouter = require("./Routes/storeRouter");
const hostrouter = require("./Routes/hostroutes");
const path = require("path");
const authRouter = require("./Routes/authRoute");
const session = require("express-session");
const MongoDBstore = require("connect-mongodb-session")(session);
const { collection } = require("./models/home");
const MongDBUrl =
  "mongodb+srv://root:root@myproject.pmimgo1.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Myproject";

const store = new MongoDBstore({
  uri: MongDBUrl,
  collection: "session",
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "Airbnb",
    resave: false,
    saveUninitialized: true,
    store,
  })
);

// app.use((req, res, next) => {
//   req.isLoggedIn = req.get("Cookie")?.split("=")[1] || false;
//   console.log(req.isLoggedIn);
//   next();
// });

// replaced from cookie to session

app.use((req, res, next) => {
  isLoggedIn = req.session.isLoggedIn;
  // console.log(req.isLoggedIn);
  next();
});

// app.get(
//   "/",
//   (req, res, next) =>
//     res.send(`WELCOME TO AIRBNB <br>
//   <a href="/host/add-home">ADD HOME </a>`) //only one res.send can be used to in one path
// );

//REPLACED ABOVE CODE

app.use(storeRouter);

// app.get("/host/add-home", (req, res, next) =>
//   res.send(`<form action="/host/add-home" method="POST">
//   <input type="text" name="Housename" placeholder="Enter your house name" >
//   <input type="text"  name="Email" placeholder="Enter your Email" >
//    <button>SUBMIT</button>
//    </form>`)
// );

// app.post("/host/add-home", (req, res, next) => {
//   console.log(req.body), res.send(`<h1> THANKS FOR ADDING</h1>`);
// });

//REPLACED CODE
app.use("/host", (req, res, next) => {
  if (!isLoggedIn) {
    res.redirect("/login");
  }
  next();
});

app.use("/host", hostrouter);
app.use(authRouter);

// app.use((req, res, next) => {
//   res.status(404).send(`ERROR 404 == Page cannot be found`);
// });

//REPLACED CODE

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    isLoggedIn: req.session.isLoggedIn,
  });
});

const PORT = 3000;
const url =
  "mongodb+srv://root:root@myproject.pmimgo1.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Myproject";
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to mongo using mongoose");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect", err);
  });

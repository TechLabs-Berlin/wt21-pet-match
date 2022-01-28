const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
//----------Mongo DB Atlas--------------------------------------------------
mongoose.connect('mongodb+srv://petmatch-admin:techlab2122@cluster0.9nbuq.mongodb.net/petmatch', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
  
//-----------------------------------------------------------
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:3000", 
      credentials: true,
    })
  );
  app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(cookieParser("secretcode"));
  app.use(passport.initialize());
  app.use(passport.session());
  require("./passportConfig")(passport);

//---------- Start of Routes --------------------------------------------------
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/login2", async (req, res) => {
  const [user1] = await User.find({email: req.body.username});
  res.send("okay");
  console.log(user1._id);
});


 //app.post("/login", (req, res, next) => {
  // passport.authenticate("local", (err, user, info) => {
 //    if (err) throw err;
  //   if (!user) res.send("No User Exists");
   //  else {
     //  req.logIn(user, (err) => {
     //    if (err) throw err;
      //   res.send("Successfully Authenticated");
        // console.log(req.user);

      
     //  }); res.json({
      //   email: email,
      //   _id
      // });
     // }
    
   //})(req, res, next);

 //});


  //app.post("/login", (req, res, next) => {
    //passport.authenticate("local", (err, user, info) => {
     // if (err) throw err;
      //if (!user) res.send("No User Exists");
      //else {
       // req.logIn(user, (err) => {
       //   if (err) throw err;
         // res.send("Successfully Authenticated");
        // console.log(req.user);
       // });
     // }
  //  })(req, res, next);
//  });

/* exports.postlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
};
 */

  
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
    })
  //---//////
  app.get("/user", (req, res) => {
    res.send(req.user); 
  });

//---------- Start of Server --------------------------------------------------
app.listen(4000, () => {
    console.log("Server Has Started");
  });
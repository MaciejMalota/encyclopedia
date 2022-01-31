const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").secret;
const User = require("../../model/User");
const nodemailer = require("nodemailer");
/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
router.post("/register", async (req, res) => {
  let {
    username,
    email,
    password,
    permission,
    age,
    banned,
    deleted,
    confirm_password,
  } = req.body;
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Password do not match.",
    });
  }
  // Check for the unique Username
  User.findOne({
    username: username,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "Username is already taken.",
      });
    }
  });
  // Check for the Unique Email
  User.findOne({
    email: email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "Email is already registred. Did you forgot your password.",
      });
    }
  });
  // The data is valid and new we can register the user
  let newUser = new User({
    username,
    password,
    permission,
    age,
    banned,
    deleted,
    email,
  });
  // Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        //email verification msg
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            type: "login",
            user: process.env.USRN_EMAIL, // EMAIL USERNAME
            pass: process.env.PW_EMAIL, // EMAIL PASSWORD
          },
        });

        const payload = { username: newUser.username };
        let emailToken = jwt.sign(payload, process.env.JWT_SECRET);

        const url = `http://localhost:5000/api/users/confirmemail/${emailToken}`;

        transporter.sendMail({
          from: '"GamesLibrary" <emailveryficationMacMal@gmail.com>', // sender address
          to: user.email,
          subject: "Confirm Email",
          html: `Hello ${user.name}!<br> Click this link to confirm your email :) : <br><a href="${url}">${url}</a>`,
        });

        return res.status(201).json({
          success: true,
          msg: "Hurry! User is now registered.",
        });
      });
    });
  });
});

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
router.post("/login", (req, res) => {
  User.findOne({
    username: req.body.username,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "Username is not found.",
        success: false,
      });
    }
    if (!user.email_verified) {
      return res.status(404).json({
        msg: "Email is not verificated.",
        success: false,
      });
    }
    // If there is user we are now going to compare the password
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // User's password is correct and we need to send the JSON Token for that user
        const payload = {
          _id: user._id,
          username: user.username,

          email: user.email,
        };
        jwt.sign(
          payload,
          key,
          {
            expiresIn: 604800,
          },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
              user: user,
              msg: "Hurry! You are now logged in.",
            });
          }
        );
      } else {
        return res.status(404).json({
          msg: "Incorrect password.",
          success: false,
        });
      }
    });
  });
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    return res.json({
      user: req.user,
    });
  }
);

router.get("/", function (req, res) {
  var usersMap = {};
  User.find({}, function (err, users) {
    users.forEach(function (user) {
      usersMap[user._id] = user;
    });

    res.send(usersMap);
  });
});
//EMAIL VERIFICATION
router.get("/confirmemail/:token", async function (req, res) {
  const { token } = req.params;
  try {
    login = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.redirect(`http://localhost:8080/`);
  }
  //find one

  const response = await User.findOneAndUpdate(
    { username: login.username },
    { email_verified: true }
  );
  console.log(response);

  //end
  res.redirect(`http://localhost:8080/emailverif`);
});

//PW RESET

router.post("/updateUser", async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(
      req.body.usr.id,
      req.body.usr
    );

    if (!response) throw Error("Something went wrong");
    const updated = { ...response._doc, ...req.body.usr };
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await User.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//PW RESET

router.post("/recovery/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const response = await User.findOne({ email });
    console.log(response);

    if (response==null) {res.status(500).json({ message: "Nie ma takiego EMAILA" });
    return}
    //

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "login",
        user: process.env.USRN_EMAIL, // EMAIL USERNAME
        pass: process.env.PW_EMAIL, // EMAIL PASSWORD
      },
    });

    const payload = { email: email };
    let emailToken = jwt.sign(payload, process.env.JWT_SECRET);

    const url = `http://localhost:8080/pwchange/${emailToken}`;
   // console.log(url);
      transporter.sendMail({
        from: '"GamesLibrary" <emailveryficationMacMal@gmail.com>', // sender address
        to: email,
        subject: 'Reset Password',
        html: `Hello ${response.username}!<br> Click this link to reset your password :) : <br><a href="${url}">${url}</a>`,
      });
    if(!response)throw Error('Something went wrong')
    const updated = { ...response._doc, ...req.body.usr }
   
    res.status(200).json(updated);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post("/checkToken/:token", async (req, res) => {
  const { token } = req.params;
  console.log(token);
  try {
    // const response = await User.findByIdAndUpdate(req.body.usr.id, req.body.usr);

    const check = jwt.verify(token, process.env.JWT_SECRET);
    console.log(check);
    res.status(200).json(check.email);
  } catch (error) {
    console.log("scas");
    res.status(500).json({ message: error.message });
  }
});

router.post("/updatePassword", async (req, res) => {
  try {
    console.log(req.body.newData.password)
    const hashedPassword = await hashPassword(req.body.newData.password);

    // pass = { password: hashedPassword };
    response = User.findOneAndUpdate({ email: req.body.newData.email }, {$set:{password:hashedPassword}}).exec();
    console.log(response);

    if (!response) throw Error("Something went wrong");
    const updated = { ...response._doc};
    console.log(updated)
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function hashPassword(pass) {
  const password = pass;
  const saltRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

module.exports = router;

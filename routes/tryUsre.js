// const express = require("express");

// const router = express.Router();
// const passport = require("passport");

// const User = require("../models/user");


// router.post("/register", (req, res) => {
//     const { name, email, password, password2 } = req.body;
    

//     if (!name || !email || !password || !password2) {
//         return res.status(422)
//             .send({ error: "Kindly provide all details" });
//     }

//     if (password != password2) {
//         return res.status(422)
//             .send({ error: "Password don't match" });
//     }


    
//         User.findOne({ email: email }).then((user) => {
//             if (user) {
               
//                 return res.status(422).send({ error: "An account with the same email already exist! Try Logging in!" })
//             } else {
                // const newUser = new User({
                //     name,
                //     email,
                //     password,
                // });

                
//                 newUser
//                     .save()
//                     .then((user) => {
//                         console.log(user);

                        
//                         res.send({ 
//                             message: "User successfully created! Woohoo! Login to join the party!",
//                             user: user
//                          })
//                     })
//                     .catch((err) => {
//                         console.log(err)
//                         return res.status(400).send({ error: "Error creating an account!\n Please try again" })
//                     });
//             }
//         });
    
// });

// router.post("/login", (req, res, next) => {
//     var { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(422)
//             .send({ error: "Kindly provide all the necessary credentials for logging in!" });
//     }
//     passport.authenticate("local", function (err, user, info) {
//         if (err) {
//             return res.status(422).json(err);
//         }
//         if (!user) {
//             return res.status(422).send({ error: "Email not found" });;
//         }
//         req.logIn(user, function (err) {
//             if (err) {
//                 return res.status(400).send({ error: err});
//             }
//             const token = user.id
//             return res.send({
//                 success: true,
//                 user: user,
//                 token
//             });
//         });
//     })(req, res, next);
// });

// router.get("/logout", (req, res) => {
//     req.logout();
//     req.flash("success_msg", "You are logged out");
//     res.redirect("/users/login");
// });
// module.exports = router;
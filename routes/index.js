const express = require('express');
const router = express.Router();
var session = require('express-session');

require('../Model/conn');

const userD = require('../Model/user');



router.use(session({
     secret: 'keyboard cat',
     resave: false,
     saveUninitialized: true
}));


const posts = [
     { title: 'Title 1', body: 'Body 1' },
     { title: 'Title 2', body: 'Body 2' },
     { title: 'Title 3', body: 'Body 3' },
     { title: 'Title 4', body: 'Body 4' },
]

const user = {
     name: 'Tim',
     email: 'Palanpur',
     admin: true,
}

router.get('/', (req, res) => {
     res.render('index', {
          user: user,
          title: "HOME PAGE",
     })
})

router.get('/articles', (req, res) => {
     res.render('articles', {
          articles: posts,
          title: "Articles Page",
     })
})

router.get('/about', (req, res) => {
     res.render('about', {
          title: "aboutUs page",
     });
});

router.get('/login', (req, res) => {
     res.render('login', { title: "login page", msg: "" });
})


router.get('/signup', (req, res) => {
     res.render('signup', { title: "signup page", msg: "" });
})

function check(req, res, next) {
     let Name = req.body.name;
     let Email = req.body.email;
     let Password = req.body.password;
     if (Name === "" || Email === "" || Password === "") {
          return res.render('signup', { title: "signup page", msg: "please fill the fields" });
     }
     else {
          const us = new userD({ Name, Email, Password });
          us.save();
          next();
     }


}

router.post('/signup', check, (req, res) => {
     res.render('login', { title: "login page" });
})


router.post('/login', async (req, res) => {
     console.log(req.body);
     let { Email, Password } = req.body;
     const em = await userD.find({ Email });
     if (em[0] === undefined) {
          res.render('login', { title: "login page", msg: "please enter valid email" });
     }
     else {
          if (em[0].Password === Password) {
               req.session.user = Email;
               res.render('dashbord', { user: req.session.user });
          }
          else {
               res.render('login', { title: "login page", msg: "please enter valid password" });
          }

     }
})


router.get('/dashbord', (req, res) => {
     if (req.session.user) {
          res.render('dashbord', { user: req.session.user });
     }
     else {
          res.render('login', { title: "login page", msg: "" });
     }
})

router.get('/logout', (req, res) => {
     req.session.user = null;
     res.render('login', { title: "login page", msg: "" });
})

module.exports = router;
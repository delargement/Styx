import {Router} from 'express';

import slsk from 'slsk-client';
import User from "../types/User";

const index = Router();

index.get('/',(req, res) => {
  // if (!req.session.user || !req.session.user.loggedIn){
  //   return res.redirect('/login');
  // }
  return res.render('home');
});

index.get('/login',(req, res) => {
  res.render('login', {
    title: 'Login',
    layout: false,
  })
});

index.post('/user',(req, res) => {
  if(req.body.username === "" || req.body.password === ""){
    console.log('Empty login');
    res.status(400).send('Empty Login');
    res.end();
  }
  slsk.connect({
    user: req.body.username,
    pass: req.body.password,
  },
    (err: any,client: any) => {
      if(err) {
        console.log(err);
        res.status(400).send('invalid credentials');
      }
      if(!req.session.user)
        req.session.user = new User();
      req.session.user.slskUsername = req.body.username;
      req.session.user.slskClient = client;
      req.session.user.loggedIn = true;
      console.log(`Logged in successfully as ${req.body.username}`);
      res.redirect('/');
    });
})

export default index;

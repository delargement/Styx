import {Router} from 'express';

const index = Router();

index.get('/',(req, res) => {
  if (!req.session.user || !req.session.user.loggedIn){
    return res.redirect('/login');
  }
});
index.get('/login',(req, res) => {
  res.render('login', {
    title: 'Login',
  })
});

export default index;

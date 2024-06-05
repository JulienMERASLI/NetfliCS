import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import { appDataSource } from '../datasource.js';

const authRouter = express.Router();

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

authRouter.post(
  '/login/password',
  passport.authenticate('local', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/login',
  })
);

authRouter.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:3000/');
  });
});

authRouter.get('/connected', function (req, res) {
  res.json({ connected: req.isAuthenticated() });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, function verify(
    email,
    password,
    cb
  ) {
    appDataSource
      .getRepository('User')
      .findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return cb(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          'sha256',
          function (err, hashedPassword) {
            if (err) {
              return cb(err);
            }
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return cb(null, false, {
                message: 'Incorrect username or password.',
              });
            }

            return cb(null, user);
          }
        );
      });
  })
);

export default authRouter;

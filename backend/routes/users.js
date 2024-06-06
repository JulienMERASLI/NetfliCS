import express from 'express';
import crypto from 'crypto';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import MovieUser from '../entities/movie_user.js';

const router = express.Router();

router.post('/new', function (req, res, next) {
  if (req.body.password !== req.body.confirmPassword) {
    return res.redirect(`${process.env.VITE_FRONTEND_URL}/signup`);
  }
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    'sha256',
    function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      appDataSource
        .getRepository(User)
        .insert({
          email: req.body.username,
          pseudo: req.body.pseudo,
          birthdate: req.body.birthdate,
          password: hashedPassword,
          salt: salt,
        })
        .then(function () {
          res.redirect(`${process.env.VITE_FRONTEND_URL}/login`);
        })
        .catch((e) => {
          console.error(e);
          res.redirect(`${process.env.VITE_FRONTEND_URL}/signup`);
        });
    }
  );
});

router.get('/MyList', function (req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    appDataSource
      .getRepository(MovieUser)
      .find({
        select: { movie_id: true },
        where: { user_id: req.user.id },
      })
      .then(function (movies) {
        res.json({ movies: movies });
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
      });
  }
});

export default router;

import express from 'express';
import crypto from 'crypto';
import { Like } from 'typeorm';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import MovieUser from '../entities/movie_user.js';

const router = express.Router();

router.post('/new', function (req, res, next) {
  if (
    req.body.password !== req.body.confirmPassword ||
    req.body.password.length < 8 ||
    req.body.pseudo.length < 3 ||
    req.body.pseudo.length > 20 ||
    req.body.birthdate.length !== 10 ||
    !req.body.birthdate.match(/^\d{4}-\d{2}-\d{2}$/)
  ) {
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

router.get('/MyList', async function (req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    appDataSource
      .getRepository(MovieUser)
      .find({
        relations: {
          movie: true,
          user: true,
        },
        where: {
          user: req.user,
          movie: {
            movie_name: req.query.search
              ? Like('%' + req.query.search + '%')
              : undefined,
          },
        },
        order: {
          note: 'DESC',
        },
      })
      .then(async (movies) => {
        res.json({ movies: movies });
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
      });
  }
});

export default router;

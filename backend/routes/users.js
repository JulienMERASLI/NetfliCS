import express from 'express';
import crypto from 'crypto';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res, next) {
  if (req.body.password !== req.body.confirmPassword) {
    return res.redirect('http://localhost:3000/signup');
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
        .then(function (user) {
          res.redirect('http://localhost:3000/login');
        });
    }
  );
});

router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

export default router;

import express from 'express';
import { appDataSource } from '../datasource.js';
import MovieUser from '../entities/movie_user.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  try {
    const movie = await appDataSource.getRepository(MovieUser).findOne({
      select: {
        note: true,
      },
      where: { movie_id: req.params.id, user_id: req.user.id },
    });
    if (movie === undefined) {
      res.status(404).json({ message: 'Film non trouvé' });
    } else {
      res.status(200).json(movie);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/new', (req, res) => {
  if (!req.body.rating) {
    return res.status(400).json({ message: 'Requête invalide' });
  }
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  const movieUserRepository = appDataSource.getRepository(MovieUser);
  try {
    console.log(req.body);
    movieUserRepository.save({
      movie_id: req.body.movie_id,
      user_id: req.user.id,
      note: req.body.rating,
    });
    res.status(201).json({ message: 'Note créée' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

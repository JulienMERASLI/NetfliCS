import express from 'express';
import { appDataSource } from '../datasource.js';
import MovieUser from '../entities/movie_user.js';
import Movies from '../entities/movies.js';
import Users from '../entities/user.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  if (!req.params.id) {
    return res.status(400).json({ message: 'Requête invalide' });
  }
  try {
    const movie_id = req.params.id;
    const { user } = req;
    const ratingMovie = await appDataSource.getRepository(MovieUser).find({
      select: ['note', 'id'],
      relations: {
        movie: true,
        user: true,
      },
      where: { movie: { movie_id }, user: user },
    });
    if (ratingMovie === undefined) {
      res.status(404).json({ message: 'Film non trouvé' });
    } else {
      res.status(200).json(ratingMovie);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/new', async (req, res) => {
  if (!req.body.rating) {
    return res.status(400).json({ message: 'Requête invalide' });
  }
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  const movieUserRepository = appDataSource.getRepository(MovieUser);
  const movieRepository = appDataSource.getRepository(Movies);

  try {
    const { user } = req;
    const movieInDb = await movieRepository.findOne({
      where: { movie_id: req.body.movie_id },
    });
    const movie = {
      movie_id: req.body.movie_id,
    };
    if (!movieInDb) {
      await movieRepository.save({
        movie_id: req.body.movie_id,
        movie_name: req.body.movie_name,
      });
    }
    if (movieInDb) {
      const movieUser = await movieUserRepository.findOne({
        where: { movie, user },
      });
      if (movieUser !== null) {
        await movieUserRepository.update(
          { movie, user },
          { note: req.body.rating }
        );
        res.status(201).json({ message: 'Note mise à jour' });
      } else {
        await movieUserRepository.save({
          movie: movieInDb,
          user: user,
          note: req.body.rating,
        });
        res.status(201).json({ message: 'Note créée' });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

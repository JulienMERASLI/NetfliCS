import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import MovieUser from '../entities/movie_user.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await appDataSource.getRepository(Movie).find();
  res.json({ movies });
});

router.get('/:id', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
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
});

router.post('/new', async (req, res) => {
  if (!req.body.rating) {
    return res.status(400).json({ message: 'Requête invalide' });
  }
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  const movieUserRepository = appDataSource.getRepository(MovieUser);
  const newMovieUser = movieUserRepository.create({
    movie_id: req.body.movie_id,
    user_id: req.user.id,
    note: req.body.rating,
    status: req.body.status,
  });
  try {
    await movieUserRepository.save(newMovieUser);
  } catch (e) {
    console.log(e);
    if (e.code === 'ER_DUP_ENTRY') {
      // Replace the rating and status if the user has already rated the movie
      await movieUserRepository.update(
        { movieId: req.body.movie_id, userId: req.user.id }, // condition
        { rating: req.body.rating, status: req.body.status } // new values
      );
    } else {
      return res.status(500).json({ message: 'Erreur 500' });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const movieRepository = appDataSource.getRepository(Movie);
    const movie = await movieRepository.find({
      where: { id: req.params.id },
    });
    if (movie.length === 0) {
      res.status(404).json({ message: 'Film non trouvé' });
    } else {
      await movieRepository.delete({ id: req.params.id });
      res.status(200).json({ message: 'Film supprimé' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Erreur 500' });
  }
});

export default router;

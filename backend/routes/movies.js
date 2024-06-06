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
    const movieRepository = appDataSource.getRepository(Movies);
    const userRepository = appDataSource.getRepository(Users);
    const user = await userRepository.findOne({ where: { id: req.user.id } });
    const movie_db = await movieRepository.findOne({
      where: { movie_id: movie_id },
    });
    const movie = await appDataSource.getRepository(MovieUser).find({
      select: ['note', 'id'],
      relations: {
        movie: true,
        user: true,
      },
      where: { movie: movie_db, user: user },
    });
    console.log('Movie: ', movie_db);
    console.log('id: ', movie);
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
    await movieRepository.save({
      movie_id: req.body.movie_id,
      movie_name: req.body.movie_name,
    });
    const userRepository = appDataSource.getRepository(Users);
    const user = await userRepository.findOne({
      where: { id: req.user.id },
    });
    const movie = await movieRepository.findOne({
      where: { movie_id: req.body.movie_id },
    });
    if (movie !== undefined) {
      const exists = await movieUserRepository.findOne({
        where: { movie: movie, user: user },
      });
      console.log('Exists: ', exists);
      if (exists !== null) {
        console.log('Updating movieUser');
        await movieUserRepository.update(
          { movie: movie, user: user },
          { note: req.body.rating }
        );
        res.status(201).json({ message: 'Note mise à jour' });
      } else {
        console.log('Saving movieUser', req.body.rating);
        await movieUserRepository.save({
          movie: movie,
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

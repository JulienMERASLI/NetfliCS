import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await appDataSource.getRepository(Movie).find();
  res.json({ movies });
});

router.get('/:id', async (req, res) => {
  const movie = await appDataSource.getRepository(Movie).find({
    where: { id: req.params.id },
  });
  if (movie.length === 0) {
    res.status(404).json({ message: 'Film non trouvé' });
  } else {
    res.json({ movie });
  }
});

router.post('/new', async (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    id: req.body.id,
    averageRating: req.body.averageRating,
    category: req.body.category,
  });
  try {
    await movieRepository.save(newMovie);
  } catch (e) {
    if (e.code !== 'ER_DUP_ENTRY') {
      console.log(e);
      res.status(500).json({ message: 'Erreur 500' });
    }
  } finally {
    res.status(201).json({ message: 'Film créé' });
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
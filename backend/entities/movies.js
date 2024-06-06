import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movies',
  columns: {
    movie_id: {
      primary: true,
      type: Number,
    },
    movie_name: {
      type: String,
    },
  },
});

export default Movie;

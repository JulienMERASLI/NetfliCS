import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
    },
    averageRating: {
      type: Number,
    },
    category: {
      type: String,
    },
  },
});

export default Movie;

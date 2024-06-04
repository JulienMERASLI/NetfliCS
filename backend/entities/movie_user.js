import typeorm from 'typeorm';

const MovieUser = new typeorm.EntitySchema({
  name: 'MovieUser',
  columns: {
    movie_id: {
      primary: true,
      type: Number,
    },
    user_id: {
      primary: true,
      type: Number,
    },
    status: {
      type: Number,
    },
    note: {
      type: Number,
    },
  },
  relations: {
    movie: {
      target: 'Movie',
      type: 'many-to-one',
      joinColumn: true,
    },
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
    },
  },
});

export default MovieUser;

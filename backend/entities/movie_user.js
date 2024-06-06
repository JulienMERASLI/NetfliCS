import typeorm from 'typeorm';

const MovieUser = new typeorm.EntitySchema({
  name: 'MovieUser',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    note: {
      type: Number,
    },
  },
  relations: {
    movie: {
      target: 'Movies',
      primary: true,
      type: 'many-to-one',
      joinColumn: {
        name: 'movie_id',
        primary: true,
      },
    },
    user: {
      target: 'Users',
      type: 'many-to-one',
      joinColumn: {
        name: 'user_id',
        primary: true,
      },
    },
  },
});

export default MovieUser;

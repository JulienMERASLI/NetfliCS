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
    note: {
      type: Number,
    },
  },
});

export default MovieUser;

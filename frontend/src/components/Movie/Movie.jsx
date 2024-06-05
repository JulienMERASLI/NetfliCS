import { useContext } from 'react';
import './Movie.css';
import placeholder from '/placeholder.svg';

import { MovieSelectedContext } from '../../pages/Home/Home';
import { TmdbImage } from '../TmdbImage';

export const Movie = ({ title, releaseDate, image, id }) => {
  const [, setMovieSelected] = useContext(MovieSelectedContext);

  return (
    <button
      className="movie"
      onClick={() => {
        setMovieSelected(null);
        setMovieSelected(id);
      }}
    >
      <TmdbImage
        src={image ? `https://image.tmdb.org/t/p/w500/${image}` : placeholder}
        alt={title}
        className="cardImage"
      />
      <h2 className="cardTitle">{title}</h2>
      <p>{releaseDate}</p>
    </button>
  );
};

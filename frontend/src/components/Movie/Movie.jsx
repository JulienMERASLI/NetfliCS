import { useContext } from 'react';
import './Movie.css';
import placeholder from '/placeholder.svg';
import { MovieSelectedContext } from '../../pages/Home/Home';
export const Movie = ({ title, releaseDate, image, id }) => {
  const [movieSelected, setMovieSelected] = useContext(MovieSelectedContext);

  return (
    <div className="movie" onClick={() => setMovieSelected()}>
      <img
        src={image ? `https://image.tmdb.org/t/p/w500/${image}` : placeholder}
        alt={title}
      />
      <h2>{title}</h2>
      <p>{releaseDate}</p>
    </div>
  );
};

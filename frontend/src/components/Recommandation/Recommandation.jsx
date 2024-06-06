import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { API_KEY, RatingContext } from '../../pages/Home/Home';

export const useFetchRecommended = (rating) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/recommended', { withCredentials: true })
      .then(async (response) => {
        const movies_recommended = await Promise.all(
          response.data.recommended.map((movieId) => {
            return axios
              .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
              })
              .then((response2) => response2.data);
          })
        );
        setMovies(movies_recommended);
      });
  }, [rating]);

  return { movies };
};

export const Recommandation = () => {
  const [rating, setRating] = useContext(RatingContext);
  const { movies } = useFetchRecommended(rating);

  return (
    <div>
      <h2>Recommandations</h2>
      <div className="movies">
        <SearchResults loading={false} movies={movies} />
      </div>
    </div>
  );
};

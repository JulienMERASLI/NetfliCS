import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { API_KEY, RatingContext } from '../../pages/Home/Home';
import { useLoading } from '../../Hook/useLoading';

export const useFetchRecommended = (rating) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(null);

  useLoading(loading);

  useEffect(() => {
    console.log('fetching recommended');
    setLoading(true);
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
        setLoading(false);
      });
  }, [rating]);

  return { movies, loading };
};

export const Recommandation = () => {
  const [rating] = useContext(RatingContext);
  const { movies, loading } = useFetchRecommended(rating);

  return (
    <div>
      <h2>Recommendations</h2>
      <div className="movies">
        <SearchResults loading={loading} movies={movies} />
      </div>
    </div>
  );
};

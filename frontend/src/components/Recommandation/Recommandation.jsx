import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { API_KEY, RatingContext } from '../../pages/Home/Home';
import { useProgressBar } from '../../Hook/useProgressBar';
import './Recommandation.css';

export const useFetchRecommended = (rating) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(null);

  useProgressBar(loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/recommended`, {
        withCredentials: true,
      })
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { movies, loading };
};

export const Recommandation = () => {
  const [rating] = useContext(RatingContext);
  const { movies, loading } = useFetchRecommended(rating);

  return (
    <div className="recommendationsContainer">
      <h2 className="recommendationsTitle">Recommendations</h2>
      <div className="movies recommendationsDiv">
        <SearchResults
          loading={loading}
          movies={movies}
          className="recommendations"
        />
      </div>
    </div>
  );
};

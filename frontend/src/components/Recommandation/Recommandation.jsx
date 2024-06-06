import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchResults } from '../../SearchResults/SearchResults';
import { API_KEY } from '../../pages/Home/Home';

export const useFetchRecommended = (rating) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log('fetching recommended');
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
  const { movies } = useFetchRecommended(0);

  return (
    <div>
      <h2>Recommandations</h2>
      <div className="movies">
        <SearchResults loading={false} movies={movies} />
      </div>
    </div>
  );
};

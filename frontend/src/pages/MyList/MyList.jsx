import './MyList.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { SearchResults } from '../../components/SearchResults/SearchResults';
import { API_KEY, MovieSelectedContext, RatingContext } from '../Home/Home';
import { MovieDialog } from '../../components/MovieDialog/MovieDialog';
import { useLoading } from '../../Hook/useLoading';

function MyList() {
  const [myList, setMyList] = useState([]);
  const [movieSelected, setMovieSelected] = useState(null);
  const [rating, setRating] = useState(0);

  const [loading, setLoading] = useState(null);

  useLoading(loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/MyList`, {
        withCredentials: true,
      })
      .then(async (response) => {
        const movies_list = await Promise.all(
          response.data.movies.map((movie) => {
            return axios
              .get(`https://api.themoviedb.org/3/movie/${movie.movie_id}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
              })
              .then((response2) => response2.data);
          })
        );
        setMyList(movies_list);
        setLoading(false);
      });
  }, []);

  return (
    <MovieSelectedContext.Provider value={[movieSelected, setMovieSelected]}>
      <RatingContext.Provider value={[rating, setRating]}>
        <h1>My list</h1>
        <SearchResults loading={false} movies={myList} />
        {createPortal(<MovieDialog />, document.body)}
      </RatingContext.Provider>
    </MovieSelectedContext.Provider>
  );
}

export default MyList;

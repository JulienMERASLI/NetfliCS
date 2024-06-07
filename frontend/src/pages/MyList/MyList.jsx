import './MyList.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { SearchResults } from '../../components/SearchResults/SearchResults';
import { API_KEY, MovieSelectedContext, RatingContext } from '../Home/Home';
import { MovieDialog } from '../../components/MovieDialog/MovieDialog';
import { useProgressBar } from '../../Hook/useProgressBar';
import { useConnection } from '../../Hook/useConnection';

function MyList() {
  const [myList, setMyList] = useState([]);
  const [movieSelected, setMovieSelected] = useState(null);
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(null);

  useConnection();
  useProgressBar(loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/users/MyList?${
          search !== '' ? `search=${search}` : ''
        }`,
        {
          withCredentials: true,
        }
      )
      .then(async (apiResponse) => {
        const movies_list = await Promise.all(
          apiResponse.data.movies.map(({ movie }) => {
            return axios
              .get(`https://api.themoviedb.org/3/movie/${movie.movie_id}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
              })
              .then((tmdbResponse) => tmdbResponse.data);
          })
        );
        setMyList(movies_list);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  return (
    <MovieSelectedContext.Provider value={[movieSelected, setMovieSelected]}>
      <RatingContext.Provider value={[rating, setRating]}>
        <h1>My list</h1>
        <input
          id="search"
          placeholder="Rechercher..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchResults loading={loading} movies={myList} />
        {createPortal(<MovieDialog />, document.body)}
      </RatingContext.Provider>
    </MovieSelectedContext.Provider>
  );
}

export default MyList;

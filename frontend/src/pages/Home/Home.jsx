import { createContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import nprogress from 'nprogress';
import { useDebounce } from 'use-debounce';
import useFetchConnected from '../../Hook/useFetchConnected';
import { Movie } from '../../components/Movie/Movie';
import './Home.css';
import 'nprogress/nprogress.css';
import { MovieDialog } from '../../components/MovieDialog/MovieDialog';
import { SearchResults } from '../../SearchResults/SearchResults';
import { Recommandation } from '../../components/Recommandation/Recommandation';
import { FilterSearch } from '../../components/FilterSearch/FilterSearch';

export const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo';

const useFetchMovies = (movieName) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || '1';

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  });

  useEffect(() => {
    if (!movieName) {
      return;
    }
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieName, page]);

  return { movies, loading };
};
export const MovieSelectedContext = createContext([]);

function Home() {
  const connected = useFetchConnected();

  const navigate = useNavigate();
  useEffect(() => {
    if (connected !== null && !connected) {
      navigate('/login');
    }
  }, [connected, navigate]);

  const [movieName, setMovieName] = useState('');
  const [debouncedMovieName] = useDebounce(movieName, 300);

  const { movies, loading } = useFetchMovies(debouncedMovieName);

  const [movieSelected, setMovieSelected] = useState(null);

  return (
    <MovieSelectedContext.Provider value={[movieSelected, setMovieSelected]}>
      <div className="App">
        <h1>Films</h1>
        <div id="searchDiv">
          <input
            id="search"
            placeholder="Rechercher..."
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
          />
        </div>
        {debouncedMovieName === '' ? (
          <>
            <Recommandation />
            <FilterSearch />
          </>
        ) : (
          <SearchResults loading={loading} movies={movies} />
        )}
      </div>
      {createPortal(<MovieDialog />, document.body)}
    </MovieSelectedContext.Provider>
  );
}

export default Home;

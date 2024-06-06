import { createContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import useFetchConnected from '../../Hook/useFetchConnected';
import './Home.css';
import 'nprogress/nprogress.css';
import { MovieDialog } from '../../components/MovieDialog/MovieDialog';
import { SearchResults } from '../../SearchResults/SearchResults';
import { Recommandation } from '../../components/Recommandation/Recommandation';
import { FilterSearch } from '../../components/FilterSearch/FilterSearch';
import { useLoading } from '../../Hook/useLoading';

export const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo';

export const usePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '1');

  const navigate = useNavigate();

  const setPage = (p) => navigate(`?page=${p}`);

  return [page, setPage];
};

const useFetchMovies = (movieName) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(null);
  const [page] = usePage();

  useLoading(loading);

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
  const { connected } = useFetchConnected();

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
// TODO: empecher le serveur de crash
// TODO: visuel des recommandations
// TODO: Changer 'aucun résultat' en un texte plus clair
// TODO: mettre loading pour les recommandations (en cours)
// TODO: supprimer table movie (en cours)
// TODO: colonne status
// TODO: afficher la liste sur le profil (en cours)
// TODO: améliorer le code
// TODO: créer un script qui prépare tout le serveur
// TODO: faire le .env pour la prod et mettre les variables d'env dans le code
// TODO: décider de la langue du texte sur le front

export default Home;

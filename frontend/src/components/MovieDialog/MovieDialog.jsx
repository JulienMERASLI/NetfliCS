import { useContext, useEffect, useRef, useState } from 'react';
import nprogress from 'nprogress';
import axios from 'axios';
import { API_KEY, MovieSelectedContext } from '../../pages/Home/Home';
import './MovieDialog.css';
import { TmdbImage } from '../TmdbImage';

const useFetchMovie = (movieId) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  });

  useEffect(() => {
    if (!movieId) {
      return;
    }
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  return { movie, loading };
};

export const MovieDialog = () => {
  const [movieSelectedId, setMovieSelectedId] =
    useContext(MovieSelectedContext);
  const dialog = useRef(null);
  const { movie, loading } = useFetchMovie(movieSelectedId);

  useEffect(() => {
    if (movieSelectedId) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
    document
      .getElementById('app')
      .classList.toggle('no-scroll', movieSelectedId);
    document.body.classList.toggle('no-scroll', movieSelectedId);
  }, [movieSelectedId]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setMovieSelectedId(null);
      }
    };
    document.body.addEventListener('keydown', handler);

    return () => {
      document.body.removeEventListener('keydown', handler);
    };
  }, [movieSelectedId, setMovieSelectedId]);

  return (
    <dialog ref={dialog}>
      <div className="container">
        {movieSelectedId &&
          (loading ? (
            <div className="replacementText">Chargement...</div>
          ) : (
            <>
              <div className="titleDiv">
                <h2 className="dialogTitle">Détails de {movie.title}</h2>
                <TmdbImage src={movie.poster_path} alt={movie.title} />
              </div>
              <p>
                <span className="category">Date de sortie:</span>{' '}
                {movie.release_date}
              </p>
              <p>
                <span className="category">Résumé:</span> {movie.overview}
              </p>
              <p>
                <span className="category">Note moyenne:</span>{' '}
                {movie.vote_average} / 10
              </p>
              <p>
                <span className="category">Genres:</span>{' '}
                {movie.genres?.map((g) => g.name).join(', ')}
              </p>
              <button
                onClick={() => setMovieSelectedId(null)}
                className="closeButton"
              >
                Fermer
              </button>
            </>
          ))}
      </div>
    </dialog>
  );
};

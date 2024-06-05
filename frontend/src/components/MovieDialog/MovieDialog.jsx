import { useContext, useEffect, useRef, useState } from 'react';
import nprogress from 'nprogress';
import axios from 'axios';
import { API_KEY, MovieSelectedContext } from '../../pages/Home/Home';
import './MovieDialog.css';
import { TmdbImage } from '../TmdbImage';

const DEFAULT_FORM_VALUES = {
  movie_id: 0,
  averageRating: 0,
  rating: 0,
  status: 0,
  category: '',
};

const useFetchMovie = (movieId, setRating, rating) => {
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
  }, [movieId, setRating]);

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/movies/${movie.id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       if (res.data.note) {
  //         setRating(res.data.note);
  //       }
  //       if (movie.id !== undefined) {
  //         const form_movie = DEFAULT_FORM_VALUES;
  //         form_movie.movie_id = movie.id;
  //         form_movie.averageRating = movie.vote_average;
  //         form_movie.category = movie.genres?.map((g) => g.name).join(', ');
  //         form_movie.rating = rating;

  //         axios
  //           .post(
  //             `${import.meta.env.VITE_BACKEND_URL}/movies/new`,
  //             form_movie,
  //             {
  //               withCredentials: true,
  //             }
  //           )
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //       }
  //     });
  // }, [movie, setRating, rating]);

  useEffect(() => {
    if (loading === false) {
      if (movieId) {
        const form_movie = DEFAULT_FORM_VALUES;
        form_movie.movie_id = movieId;
        form_movie.averageRating = movie.vote_average;
        form_movie.category = movie.genres?.map((g) => g.name).join(', ');
        form_movie.rating = rating;

        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, form_movie, {
            withCredentials: true,
          })
          .finally(() => {
            axios
              .get(`${import.meta.env.VITE_BACKEND_URL}/movies/${movieId}`, {
                withCredentials: true,
              })
              .then((res) => {
                if (res.data.note) {
                  setRating(res.data.note);
                }
              });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setRating(0);
      }
    }
    console.log({ setRating, rating, movieId, loading });
  }, [setRating, rating, movieId, loading, movie.vote_average, movie.genres]);

  return { movie, loading };
};

export const MovieDialog = () => {
  const [movieSelectedId, setMovieSelectedId] =
    useContext(MovieSelectedContext);
  const dialog = useRef(null);
  const [rating, setRating] = useState(0);
  const { movie, loading } = useFetchMovie(movieSelectedId, setRating, rating);

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
                <span className="rating">Note :</span>{' '}
                <input
                  className="rating_input"
                  type="number"
                  min="0"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.valueAsNumber)}
                />
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

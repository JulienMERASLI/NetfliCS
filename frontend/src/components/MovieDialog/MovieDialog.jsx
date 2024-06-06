import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  API_KEY,
  MovieSelectedContext,
  RatingContext,
} from '../../pages/Home/Home';
import './MovieDialog.css';
import { TmdbImage } from '../TmdbImage';
import { useLoading } from '../../Hook/useLoading';

const DEFAULT_FORM_VALUES = {
  movie_id: 0,
  movie_name: '',
  rating: 0,
};

const useFetchMovie = (movieId, setRating, rating) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(null);

  useLoading(loading);

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
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId, setRating]);

  useEffect(() => {
    if (loading === false) {
      if (movieId) {
        const form_movie = DEFAULT_FORM_VALUES;
        form_movie.movie_id = movieId;
        form_movie.rating = rating;
        form_movie.movie_name = movie.title;
        console.log(rating);

        fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(form_movie),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .finally(() => {
            axios
              .get(`${import.meta.env.VITE_BACKEND_URL}/movies/${movieId}`, {
                withCredentials: true,
              })
              .then((res) => {
                if (res.data && res.data.length && res.data.length === 1) {
                  setRating(res.data[0].note);
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
  }, [
    setRating,
    rating,
    movieId,
    loading,
    movie.vote_average,
    movie.genres,
    movie.title,
  ]);

  return { movie, loading };
};

export const MovieDialog = () => {
  const [movieSelectedId, setMovieSelectedId] =
    useContext(MovieSelectedContext);
  const dialog = useRef(null);
  const [rating, setRating] = useContext(RatingContext);
  const [hover, setHover] = useState(null);
  const [totalStars] = useState(10);
  const { movie, loading } = useFetchMovie(movieSelectedId, setRating, rating);

  console.log({ movieSelectedId, rating });

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
    const currentDialog = dialog.current;

    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        setMovieSelectedId(null);
      }
    };
    const outsideClickHandler = (e) => {
      if (e.target === dialog.current) {
        setMovieSelectedId(null);
      }
    };
    document.body.addEventListener('keydown', escapeHandler);
    currentDialog.addEventListener('click', outsideClickHandler);

    return () => {
      document.body.removeEventListener('keydown', escapeHandler);
      currentDialog.removeEventListener('click', outsideClickHandler);
    };
  }, [movieSelectedId, setMovieSelectedId]);

  return (
    <dialog ref={dialog}>
      <div className="container">
        {movieSelectedId &&
          (loading ? (
            <div className="replacementText">Loading...</div>
          ) : (
            <>
              <div className="titleDiv">
                <h2 className="dialogTitle">Details of {movie.title}</h2>
                <TmdbImage src={movie.poster_path} alt={movie.title} />
              </div>
              <p>
                <span className="category">Release date:</span>{' '}
                {movie.release_date}
              </p>
              <p>
                <span className="category">Summary:</span> {movie.overview}
              </p>
              <p>
                <span className="category">Average rating:</span>{' '}
                {movie.vote_average} / 10
              </p>
              <p>
                <span className="category">Rating :</span>{' '}
                {[...Array(totalStars)].map((star, index) => {
                  const currentRating = index + 1;

                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        onChange={() => setRating(currentRating)}
                      />
                      <span
                        className="star"
                        style={{
                          color:
                            currentRating <= (hover || rating)
                              ? '#ffc107'
                              : '#e4e5e9',
                        }}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      >
                        &#9733;
                      </span>
                    </label>
                  );
                })}
              </p>
              <p>
                <span className="category">Genres:</span>{' '}
                {movie.genres?.map((g) => g.name).join(', ')}
              </p>
              <button
                onClick={() => setMovieSelectedId(null)}
                className="closeButton"
              >
                ✖
              </button>
            </>
          ))}
      </div>
    </dialog>
  );
};

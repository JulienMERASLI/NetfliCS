import { Movie } from '../components/Movie/Movie';

export const SearchResults = ({ loading, movies }) => {
  return (
    loading !== null &&
    (loading ? (
      <div className="replacementText">Chargement...</div>
    ) : movies.length > 0 ? (
      <div id="movieList">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            image={movie.poster_path}
            releaseDate={movie.release_date}
            title={movie.title}
            id={movie.id}
          />
        ))}
      </div>
    ) : (
      <div className="replacementText">Aucun résultat</div>
    ))
  );
};

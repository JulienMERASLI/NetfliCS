import { Movie } from '../Movie/Movie';
import { usePage } from '../../pages/Home/Home';

const Buttons = () => {
  const [page, setPage] = usePage();

  return (
    <div className="buttonDiv">
      {page > 1 && (
        <button onClick={() => setPage(page - 1)}>Page précédente</button>
      )}
      <button onClick={() => setPage(page + 1)}>Page suivante</button>
    </div>
  );
};

export const SearchResults = ({ loading, movies, showButtons = false }) => {
  return (
    loading !== null &&
    (loading ? (
      <div className="replacementText">Chargement...</div>
    ) : movies.length > 0 ? (
      <>
        {showButtons && <Buttons />}
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
        {showButtons && <Buttons />}
      </>
    ) : (
      <div className="replacementText">Aucun résultat</div>
    ))
  );
};

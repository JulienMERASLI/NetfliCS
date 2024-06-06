import { Movie } from '../Movie/Movie';
import { usePage } from '../../pages/Home/Home';

const Buttons = () => {
  const [page, setPage] = usePage();

  return (
    <div className="buttonDiv">
      {page > 1 && (
        <button onClick={() => setPage(page - 1)}>Previous page</button>
      )}
      <button onClick={() => setPage(page + 1)}>Next page</button>
    </div>
  );
};

export const SearchResults = ({
  loading,
  movies,
  showButtons = false,
  className = '',
}) => {
  return (
    loading !== null &&
    (loading ? (
      <div className="replacementText">Loading...</div>
    ) : movies.length > 0 ? (
      <>
        {showButtons && <Buttons />}
        <div id="movieList" className={className}>
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
      <div className="replacementText">
        We don't have that movie but you might like:
      </div>
    ))
  );
};

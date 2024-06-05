import placeholder from '/placeholder.svg';

export const TmdbImage = ({ src, alt, ...props }) => (
  <img
    src={src ? `https://image.tmdb.org/t/p/w500/${src}` : placeholder}
    alt={alt}
    {...props}
  />
);

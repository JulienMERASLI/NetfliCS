import { useLocation, useNavigate } from 'react-router-dom';

export const useQS = (key, defaultValue, number = false) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const I = (a) => a;

  const fn = number ? parseInt : I;
  const value = fn(searchParams.get(key) || defaultValue);

  const navigate = useNavigate();
  const setValue = (v) => {
    searchParams.set(key, v);
    navigate(`?${searchParams.toString()}`);
  };

  return [value, setValue];
};

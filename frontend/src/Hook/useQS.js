import { useSearchParams } from 'react-router-dom';

export const useQS = (key, defaultValue, number = false) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const I = (a) => a;

  const fn = number ? parseInt : I;
  const value = fn(searchParams.get(key) || defaultValue);

  const setValue = (v) => {
    searchParams.set(key, v);
    setSearchParams(searchParams);
  };

  return [value, setValue];
};

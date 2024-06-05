import { useEffect } from 'react';

const useFetch = (url, setState, method = 'GET') => {
  useEffect(() => {
    fetch(url, {
      credentials: 'include',
      mode: 'cors',
      method,
    })
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      });
  }, [method, setState, url]);
};

export default useFetch;

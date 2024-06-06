import { useState } from 'react';
import useFetch from './useFetch';

const useFetchConnected = () => {
  const [connected, setConnected] = useState(null);
  const [pseudo, setPseudo] = useState('');

  useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/connected`,
    ({ connected: c, pseudo: p }) => {
      setConnected(c);
      setPseudo(p);
    }
  );

  return { connected, pseudo };
};

export default useFetchConnected;

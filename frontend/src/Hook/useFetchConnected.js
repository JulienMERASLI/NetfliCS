import { useState } from 'react';
import useFetch from './useFetch';

const useFetchConnected = () => {
  const [connected, setConnected] = useState(null);

  useFetch('http://localhost:8000/connected', setConnected);

  return connected;
};

export default useFetchConnected;

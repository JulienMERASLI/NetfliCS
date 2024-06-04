import { useEffect, useState } from 'react';

const useFetchConnected = () => {
  const [connected, setConnected] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/connected', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setConnected(data.connected);
      });
  }, []);

  return connected;
};

export default useFetchConnected;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchConnected from './useFetchConnected';

export const useConnection = () => {
  const { connected } = useFetchConnected();

  const navigate = useNavigate();
  useEffect(() => {
    if (connected !== null && !connected) {
      navigate('/login');
    }
  }, [connected, navigate]);
};

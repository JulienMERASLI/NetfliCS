import nprogress from 'nprogress';
import { useEffect } from 'react';

export const useProgressBar = (loading) => {
  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [loading]);
};

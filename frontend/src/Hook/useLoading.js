import nprogress from 'nprogress';
import { useEffect } from 'react';

export const useLoading = (loading) => {
  useEffect(() => {
    if (loading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [loading]);
};

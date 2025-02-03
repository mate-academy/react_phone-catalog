import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <div>{loading && <ClipLoader color="#89939a" size={120} />}</div>;
};

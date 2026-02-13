import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useParamsSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevValues = useRef<Record<string, string | null>>({});

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let changed = false;

    if (prevValues.current.sort !== params.get('sort')) {
      if (params.get('page')) {
        changed = true;
        params.delete('page');
      }
    }

    if (prevValues.current.perPage !== params.get('perPage')) {
      changed = true;

      params.delete('page');
    }

    if (changed) {
      prevValues.current = {};
      params.forEach((val, key) => {
        prevValues.current[key] = val;
      });
      setSearchParams(params);
    }
  }, [searchParams]);
};

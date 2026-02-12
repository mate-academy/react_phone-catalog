import { useEffect, useState } from 'react';
import { fetchClient } from '../../api/fetchClient';
import { useLoading } from './useLoading';
import { TIMEOUT_LOADING_DURATION } from '../constants';

export const useFetchData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const isLoading = useLoading(TIMEOUT_LOADING_DURATION);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchClient.getData(endpoint);

        setData(result);
      } catch {
        setError(true);
      }
    };

    loadData();
  }, [endpoint]);

  return { data, isLoading, error };
};

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UILoadStatus } from './uiLoadStatus.enum';
import { ApiOKResponse, type Error } from '@shared/api';

const RETRY_ATTEMPTS = 2;
const RETRY_DELAY_MS = 1000;

const useLoadItems = <R>(loadFn: () => Promise<ApiOKResponse<R> | Error>) => {
  const [data, setData] = useState<R | UILoadStatus>(UILoadStatus.LOADING);

  const navigate = useNavigate();
  const location = useLocation();
  const abortControllerRef = useRef<AbortController | null>(null);

  const abortCurrent = () => abortControllerRef.current?.abort();

  const loadItems = useCallback(async () => {
    abortCurrent();
    abortControllerRef.current = new AbortController();
    setData(UILoadStatus.LOADING);

    for (let attempt = 0; attempt <= RETRY_ATTEMPTS; attempt++) {
      try {
        if (abortControllerRef.current.signal.aborted) {
          return;
        }

        const response = await loadFn();

        if (!response.ok) {
          if (response.error.statusCode === 404) {
            navigate('/404', {
              state: {
                message: response.error.message,
                from: location.pathname,
              },
              replace: true,
            });

            return;
          }

          if (attempt === RETRY_ATTEMPTS) {
            setData(UILoadStatus.ERROR);

            return;
          }

          await new Promise(r => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
          continue;
        }

        if (!abortControllerRef.current.signal.aborted) {
          setData(response.data);
        }

        return;
      } catch (e: unknown) {
        if (abortControllerRef.current.signal.aborted) {
          return;
        }

        if (attempt === RETRY_ATTEMPTS) {
          setData(UILoadStatus.ERROR);
        }

        await new Promise(r => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
      }
    }
  }, [loadFn, navigate]);

  useEffect(() => {
    loadItems();

    return () => abortCurrent();
  }, []);

  return { data, reload: loadItems };
};

export { useLoadItems };

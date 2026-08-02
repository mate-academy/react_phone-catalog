import { useEffect, useState } from 'react';
import { getPublicPath } from '../utils/getPublicPath';

type UseFetchListResult<T> = {
    data: T[];
    isLoading: boolean;
    error: string | null;
};

export const useFetchList = <T>(url: string): UseFetchListResult<T> => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;
        const requestUrl = getPublicPath(url);

        setIsLoading(true);
        setError(null);

        fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `Failed to load ${requestUrl}: ${response.status}`,
                    );
                }

                return response.json() as Promise<T[]>;
            })
            .then(json => {
                if (!isCancelled) {
                    setData(json);
                }
            })
            .catch((fetchError: Error) => {
                if (!isCancelled) {
                    setError(fetchError.message);
                }
            })
            .finally(() => {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [url]);

    return { data, isLoading, error };
};

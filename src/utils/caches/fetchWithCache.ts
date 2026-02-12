import { QueryCache } from './queryCache';

type QueryFn<T> = () => Promise<T>;

export async function fetchWithCache<T>(
  key: string,
  queryFn: QueryFn<T>,
  cache: QueryCache<T>,
): Promise<T> {
  const cached = cache.get(key);

  if (cached) {
    return cached;
  }

  const data = await queryFn();

  cache.set(key, data);

  return data;
}

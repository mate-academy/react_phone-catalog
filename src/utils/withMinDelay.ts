import { wait } from './wait';

export const withMinDelay = async <T>(
  promise: Promise<T>,
  delay = 700,
): Promise<T> => {
  const [result] = await Promise.all([promise, wait(delay)]);

  return result;
};

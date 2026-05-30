export const withMinDelay = async <T>(
  promise: Promise<T>,
  minDelay: number,
): Promise<T> => {
  const startTime = Date.now();

  const [result] = await Promise.all([
    promise,
    new Promise(resolve => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDelay - elapsed);

      setTimeout(resolve, remaining);
    }),
  ]);

  return result;
};

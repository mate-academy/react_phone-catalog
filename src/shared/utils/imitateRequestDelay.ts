export const imitateRequestDelay = <T>(
  request: () => Promise<T>,
): Promise<T> => {
  const promise = new Promise((resolve: (value: T) => void) => {
    setTimeout(async () => {
      const response = await request();

      resolve(response);
    }, 300);
  });

  return promise;
};

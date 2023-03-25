export const warningTimer = <T>(
  callback: (value: T) => void,
  value: T,
  delay: number,
) => {
  setTimeout(() => {
    callback(value);
  }, delay);
};

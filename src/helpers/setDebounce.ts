export const setDebounce = () => {
  let timeout: NodeJS.Timeout;

  return (callback: () => void) => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 500);
  };
};

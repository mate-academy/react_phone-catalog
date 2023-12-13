export const setDebounce = () => {
  let timeout: NodeJS.Timeout;

  return (func: (value: string) => void, value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(value), 500);
  };
};

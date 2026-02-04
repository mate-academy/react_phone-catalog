const DELAY_MS = 450;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchWithDelay = (input: RequestInfo | URL) => {
  return wait(DELAY_MS).then(() => fetch(input));
};

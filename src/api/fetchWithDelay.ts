const DELAY_MS = 250;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchWithDelay = (fetchTarget: RequestInfo | URL) => {
  return wait(DELAY_MS).then(() => fetch(fetchTarget));
};

export const delayOnPurpose = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

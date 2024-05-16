export const delay = (time: number): Promise<unknown> =>
  new Promise(res => setTimeout(res, time));

const BASE_URL = './api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export async function getData<T>(url: string): Promise<T> {
  await wait(300);
  const res = await fetch(BASE_URL + url);

  return res.json();
}

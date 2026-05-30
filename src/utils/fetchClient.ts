import { FetchOptions } from '@/types/FetchOptions';

function wait(delay: number = 200, options: FetchOptions = {}) {
  return new Promise((resolve, reject) => {
    const timerId = window.setTimeout(resolve, delay);

    if (options.signal) {
      const onAbort = () => {
        clearTimeout(timerId);
        reject(new DOMException('Aborted', 'AbortError'));
      };

      if (options.signal?.aborted) {
        return onAbort();
      }

      options.signal.addEventListener('abort', onAbort, { once: true });
    }
  });
}

const BASE_URL = 'api';

function request<T>(url: string, options: FetchOptions = {}): Promise<T> {
  return wait(200, options)
    .then(() =>
      fetch(`${BASE_URL}/${url}`, {
        signal: options.signal,
      }),
    )
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      return res.json();
    });
}

export const client = {
  get: <T>(url: string, options: FetchOptions = {}) => request<T>(url, options),
};

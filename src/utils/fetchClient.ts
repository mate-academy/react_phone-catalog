import { Options } from '@/types/FetchOptions';

function wait(delay: number = 5000, options: Options = {}) {
  return new Promise((resolve, reject) => {
    const timerId = window.setTimeout(resolve, delay);

    if (options.signal) {
      const onAbort = () => {
        clearTimeout(timerId);
        reject(new DOMException('Aborted', 'AbortError'));
      };

      if (options.signal?.aborted) return onAbort();

      options.signal.addEventListener('abort', onAbort, { once: true });
    }
  });
}

const BASE_URL = '/api';

function request<T>(url: string, options: Options = {}): Promise<T> {
  return wait(5000, options)
    .then(() =>
      fetch(`${BASE_URL}/${url}`, {
        signal: options.signal,
      }),
    )
    .then(res => res.json());
}

export const client = {
  get: <T>(url: string, options: Options = {}) => request<T>(url, options),
};

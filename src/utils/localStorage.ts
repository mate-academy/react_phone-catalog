export function setItem<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export function getItem<T>(key: string) {
  try {
    const data = localStorage.getItem(key);

    return data ? (JSON.parse(data) as T) : undefined;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export function removeItem(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export const storage = {
  save: <T>(key: string, value: T) => setItem<T>(key, value),
  get: <T>(key: string) => getItem<T>(key),
  remove: (key: string) => removeItem(key),
};

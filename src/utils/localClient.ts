export const client = {
  read: <T>(key: string): T | null => {
    const data = window.localStorage.getItem(key);

    try {
      return data && JSON.parse(data);
    } catch (error) {
      return null;
    }
  },

  write: <T>(key: string, data: T): void => {
    window.localStorage.setItem(key, JSON.stringify(data));
  },

  init: <T>(key: string, initialData: T): T => {
    // if (!client.read(key)) {
    //   client.write(key, initialData);
    // }
    return client.read(key) || initialData;
  },
};

export function getClient(key: string) {
  return {
    read: <T>(): T | null => client.read(key),
    write: <T>(data: T): void => client.write(key, data),
    init: <T>(initialData: T): T => client.init(key, initialData),
  };
}

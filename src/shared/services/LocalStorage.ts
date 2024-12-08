export class LocalStorage {
  static getItem<TValue = unknown>(key: string) {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item) as TValue;
    }

    return null;
  }

  static setItem<TValue>(key: string, value: TValue) {
    if (value) {
      const item = JSON.stringify(value);

      localStorage.setItem(key, item);
    }
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

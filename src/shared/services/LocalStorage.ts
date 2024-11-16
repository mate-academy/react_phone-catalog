export class LocalStorage {
  static getItem(key: string) {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  static setItem<V>(key: string, value: V) {
    if (value) {
      const item = JSON.stringify(value);

      localStorage.setItem(key, item);
    }
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

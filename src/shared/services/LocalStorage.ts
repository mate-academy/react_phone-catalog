export class LocalStorage {
  static getItem(key: string) {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  // static setItem(key: string, value: V) {
  //   const item;
  // }

  static removeItem: () => {};
}

const STORAGE_KEY = 'recently_viewed';

export const recentlyViewedService = {
  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },

  add(product) {
    let list = this.get();

    list = list.filter(item => item.itemId !== product.itemId);
    list.unshift(product);
    list = list.slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },
};

const STORAGE_KEY = 'recently_viewed';

export const recentlyViewedService = {
  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },

  add(productId) {
    let list = this.get();

    list = list.filter(item => item !== productId);
    list.unshift(productId);
    list = list.slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },
};

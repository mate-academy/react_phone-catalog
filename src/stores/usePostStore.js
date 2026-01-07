import { create } from 'zustand';

const usePostStore = create(set => ({
  posts: [],
  isLoading: false,
  error: null,

  // Асинхронна функція для завантаження постів
  fetchPosts: async () => {
    set({ isLoading: true, error: null }); // Встановлюємо стан завантаження та очищаємо помилки

    try {
      const response = await fetch('api/accessories.json');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      set({ posts: data, isLoading: false }); // Оновлюємо стан з отриманими даними
    } catch (error) {
      console.error('Помилка завантаження постів:', error);
      set({ error: error.message, isLoading: false }); // Встановлюємо стан помилки
    }
  },

  // Додаткова дія для очищення постів (для прикладу)
  clearPosts: () => set({ posts: [] }),
}));

export default usePostStore;

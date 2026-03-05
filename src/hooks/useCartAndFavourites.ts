import type { Book, CartItem } from '@/types/Book';
import { useLocalStorage } from './useLocalStorage';

export const useCartAndFavorites = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('bookstore-cart', []);
  const [favorites, setFavorites] = useLocalStorage<Book[]>(
    'bookstore-favorites',
    [],
  );

  const addToCart = (book: Book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) return prev;
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < 99 ?
          { ...item, quantity: item.quantity + 1 }
        : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1 ?
            { ...item, quantity: item.quantity - 1 }
          : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (book: Book) => {
    setFavorites((prev) => {
      const isFav = prev.some((item) => item.id === book.id);
      if (isFav) return prev.filter((item) => item.id !== book.id);
      return [...prev, book];
    });
  };

  return {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    toggleFavorite,
    isFavorite: (id: string) => favorites.some((item) => item.id === id),
    isInCart: (id: string) => cart.some((item) => item.id === id),
  };
};

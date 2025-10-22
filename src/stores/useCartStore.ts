import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types/Product';

// Інтерфейс для товару в кошику (додано поле quantity)
interface CartProduct extends Product {
  quantity: number; // Кількість даного товару
  // Додайте інші властивості, які потрібні для відображення в кошику
}

// Інтерфейс для стану кошика
interface CartState {
  cartItems: CartProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  increaseQuantity: (productId: string | number) => void;
  decreaseQuantity: (productId: string | number) => void;
  clearCart: () => void;
  getTotalItems: () => number; // Загальна кількість одиниць товарів у кошику
  getTotalPrice: () => number; // Загальна вартість товарів у кошику
  isAddedToCart: (productId: string | number) => boolean; // Додано для зручності перевірки
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: productToAdd => {
        set(state => {
          const existingItem = state.cartItems.find(
            item => item.id === productToAdd.id,
          );

          if (existingItem) {
            // Якщо товар вже є, збільшуємо кількість
            return {
              cartItems: state.cartItems.map(item =>
                item.id === productToAdd.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            // Якщо товару немає, додаємо його з кількістю 1
            return {
              cartItems: [...state.cartItems, { ...productToAdd, quantity: 1 }],
            };
          }
        });
      },

      removeFromCart: productIdToRemove => {
        set(state => ({
          cartItems: state.cartItems.filter(
            item => item.id !== productIdToRemove,
          ),
        }));
      },

      increaseQuantity: productIdToIncrease => {
        set(state => ({
          cartItems: state.cartItems.map(item =>
            item.id === productIdToIncrease
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },

      decreaseQuantity: productIdToDecrease => {
        set(state => ({
          cartItems: state.cartItems
            .map(item =>
              item.id === productIdToDecrease
                ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Запобігаємо кількості менше 1
                : item,
            )
            .filter(item => item.quantity > 0), // Видаляємо товар, якщо кількість стала 0
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getTotalItems: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0,
        );
      },

      getTotalPrice: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      isAddedToCart: productId => {
        return get().cartItems.some(item => item.id === productId);
      },
    }),
    {
      name: 'cart-storage', // Назва ключа в localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;

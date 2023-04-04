import { createContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CartProduct } from '../../types/CartProduct';

type CartContextProviderProps = {
  children: React.ReactNode
};

type CartContextType = {
  cart: CartProduct[],
  addToCart: (newProduct: CartProduct) => void,
  removeFromCart: (productId: string) => void;
  handleQuantityChange: (
    cartProductId: string,
    action: QuantityActions,
  ) => void;
};

export enum QuantityActions {
  Increase = 'increase',
  Decrease = 'decrease',
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart() {},
  removeFromCart() {},
  handleQuantityChange() {},
});

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', []);

  const addToCart = (product: CartProduct) => {
    setCart([
      ...cart,
      product,
    ]);
  };

  const removeFromCart = (productId: string) => {
    setCart([
      ...cart.filter(item => item.product.id !== productId),
    ]);
  };

  const handleQuantityChange = (
    cartProductId: string,
    action: QuantityActions,
  ) => {
    let newCart: CartProduct[];

    switch (action) {
      case QuantityActions.Increase:
        newCart = cart.map(cartItem => {
          if (cartItem.id === cartProductId) {
            const quantity = cartItem.quantity + 1;

            return {
              ...cartItem,
              quantity,
            };
          }

          return cartItem;
        });
        break;

      case QuantityActions.Decrease:
        newCart = cart.map(cartItem => {
          if (cartItem.id === cartProductId) {
            const quantity = cartItem.quantity - 1;

            return {
              ...cartItem,
              quantity,
            };
          }

          return cartItem;
        });
        break;

      default:
        newCart = cart;
        break;
    }

    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      handleQuantityChange,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

// export const CartContextProvider: React.FC<CartContextProviderProps> = ({
//   children,
// }) => {
//   const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', []);

//   const addToCart = (product: CartProduct) => {
//     setCart([
//       ...cart,
//       product,
//     ]);
//   };

//   const removeFromCart = (productId: string) => {
//     setCart([
//       ...cart.filter(item => item.product.id !== productId),
//     ]);
//   };

//   const handleQuantityChange = (
//     cartProductId: string,
//     action: QuantityActions,
//   ) => {
//     let newCart: CartProduct[];

//     switch (action) {
//       case QuantityActions.Increase:
//         newCart = cart.map(cartItem => {
//           if (cartItem.id === cartProductId) {
//             const quantity = cartItem.quantity + 1;

//             return {
//               ...cartItem,
//               quantity,
//             };
//           }

//           return cartItem;
//         });
//         break;

//       case QuantityActions.Decrease:
//         newCart = cart.map(cartItem => {
//           if (cartItem.id === cartProductId) {
//             const quantity = cartItem.quantity - 1;

//             return {
//               ...cartItem,
//               quantity,
//             };
//           }

//           return cartItem;
//         });
//         break;

//       default:
//         newCart = cart;
//         break;
//     }

//     setCart(newCart);
//   };

//   return (
//     <CartContext.Provider value={{
//       cart,
//       addToCart,
//       removeFromCart,
//       handleQuantityChange,
//     }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

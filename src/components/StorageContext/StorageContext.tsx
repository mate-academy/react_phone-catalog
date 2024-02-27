/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useMemo } from 'react';
import { CartItemType } from '../../types/CartItemType';
import { useLocaleStorage } from '../../helpers/hooks';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';

export const StorageContext = createContext({
  cart: JSON.parse(localStorage.getItem('carts') || '[]'),
  fav: JSON.parse(localStorage.getItem('favourites') || '[]'),
  setCart: (_cart: CartItemType[]) => {},
  setFav: (_fav: Product[]) => {},
  saveItemToCart: (_id: string, _product: ProductDetails) => {},
  saveItemToFav: (_product: Product) => {},
  deleteItemFromCart: (_id: string) => {},
  deleteItemFromFav: (_product: Product) => {},
  findItemInCart: (itemId: string, cart?: CartItemType[]) => {
    return !!cart?.find((cartItem: CartItemType) => cartItem.id === itemId);
  },
  findItemInFav: (itemId: string, fav?: Product[]) => {
    return !!fav?.find((item: Product) => item.itemId === itemId);
  },
  cartSum: (newCart: CartItemType[], isQuantity = true) => {
    return newCart.reduce((
      accumulator: number,
      currentValue: CartItemType,
    ) => accumulator + (isQuantity
      ? currentValue.quantity
      : (currentValue.product.priceDiscount * currentValue.quantity)), 0);
  },
  changeQuantity: (_item: CartItemType, _newQuantity?: number) => {},
});

type StorageProviderProps = {
  children: React.ReactNode,
};

export const StorageProvider: React.FC<StorageProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useLocaleStorage<CartItemType[]>('carts', []);
  const [fav, setFav] = useLocaleStorage<Product[]>('favourites', []);

  const saveItemToCart = (
    id: string,
    product: ProductDetails,
    quantity = 1,
  ) => {
    setCart([...cart, {
      id,
      quantity,
      product,
    }]);
  };

  const saveItemToFav = (product: Product) => setFav([...fav, product]);

  const deleteItemFromCart = (id: string) => {
    setCart(cart.filter((cartItem: CartItemType) => cartItem.id !== id));
  };

  const deleteItemFromFav = (product: Product) => {
    setFav(fav.filter((item: Product) => item.itemId !== product.itemId));
  };

  const findItemInCart = (itemId: string) => {
    return !!cart.find((cartItem: CartItemType) => cartItem.id === itemId);
  };

  const findItemInFav = (itemId: string) => {
    return !!fav.find((item: Product) => item.itemId === itemId);
  };

  const changeQuantity = (item: CartItemType, newQuantity = 1) => {
    const index = cart
      .findIndex((cartItem: CartItemType) => cartItem.id === item.id);

    const newCart = [...cart.filter(
      (cartItem: CartItemType) => cartItem.id !== item.id,
    )];

    newCart.splice(index, 0, {
      ...item,
      quantity: item.quantity + newQuantity,
    });

    setCart(newCart);
  };

  const cartSum = (newCart: CartItemType[], isQuantity = true) => {
    return newCart.reduce((
      accumulator: number,
      currentValue: CartItemType,
    ) => accumulator + (isQuantity
      ? currentValue.quantity
      : (currentValue.product.priceDiscount * currentValue.quantity)), 0);
  };

  const value = useMemo(() => ({
    cart,
    fav,
    setCart,
    setFav,
    saveItemToCart,
    saveItemToFav,
    deleteItemFromCart,
    deleteItemFromFav,
    findItemInCart,
    findItemInFav,
    cartSum,
    changeQuantity,
  }), [cart, fav]);

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
};

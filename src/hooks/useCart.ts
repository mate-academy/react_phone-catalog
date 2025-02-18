import { MouseEventHandler, useContext } from 'react';
import { CartContext } from '../ContextProvider';
import { Product } from '../types/Product';

export const useCart = (
  id: string,
  product: Product | undefined,
): [boolean, MouseEventHandler<HTMLButtonElement>] => {
  const { cartProducts, setCartProducts } = useContext(CartContext);

  const isAddedToCart = !!cartProducts.find(item => item?.id === id);

  const addToCart: MouseEventHandler<HTMLButtonElement> = e => {
    // setCartProducts([
    //   ...cartProducts,
    //   {
    //     id,
    //     images,
    //     name,
    //     priceRegular,
    //     priceDiscount,
    //     screen,
    //     capacity,
    //     ram,
    //   },
    // ]);

    e.preventDefault();

    setCartProducts(
      isAddedToCart
        ? cartProducts.filter(item => item.id !== id)
        : product
          ? [...cartProducts, { id, quantity: 1, product }]
          : [...cartProducts],
    );
  };

  return [isAddedToCart, addToCart];
};

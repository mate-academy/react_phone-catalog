import { AppDispatch } from '../app/store/store';
import { setCarts } from '../app/reducers/cart';
import { Props } from '../shared/ProductCard/ProductCard';

export const handleAddToCart = (
  id: number | string,
  itemId: string,
  image: string,
  name: string,
  price: number,
  category: string,
  quantity: number,
  cartItems: Props[],
  dispatch: AppDispatch,
  capacity: string = '',
  fullPrice: number = 0,
  color: string = '',
  screen: string = '',
  ram: string = '',
  year: number = 0,
) => {
  const productExists = cartItems.some(
    product =>
      product.id === id ||
      product.itemId === id ||
      product.id === itemId ||
      product.itemId == itemId,
  );

  if (!productExists) {
    dispatch(
      setCarts([
        {
          id,
          itemId,
          image,
          name,
          price,
          fullPrice,
          screen,
          capacity,
          ram,
          category,
          color,
          year,
          quantity,
        },
      ]),
    );
  }
};

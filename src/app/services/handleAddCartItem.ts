// app/services/favoriteUtils.ts
import { AppDispatch } from '../store';
import { ProductCardProps } from '../../components/products/productCard';
import { deleteCarts, setCarts } from '../../features/cart';

export const handleAddToCart = (
  id: number | string,
  itemId: string,
  image: string,
  name: string,
  price: number,
  category: string,
  quantity: number,
  cartItems: ProductCardProps[],
  dispatch: AppDispatch,
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
          category,
          quantity,
        },
      ]),
    );
  } else {
    dispatch(deleteCarts(itemId ? itemId : id));
  }
};

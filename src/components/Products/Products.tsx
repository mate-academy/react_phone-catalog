import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../types/product';
import { ProductItem } from '../ProductItem/ProductItem';
import { addProducts } from '../../helpers/addProducts';

interface Props {
  products: Product[];
}

export const Products: FC<Props> = ({ products }) => {
  const favoriteProducts
    = useAppSelector(state => state.favoriteProducts.value);
  const shoppingCart = useAppSelector(state => state.shoppingCart.value);
  const dispatch = useAppDispatch();

  const handleAddProductToCart = (product: Product) => {
    addProducts(dispatch, shoppingCart, product, 'shoppingCart');
  };

  const handleAddProductToFavorites = (product: Product) => {
    addProducts(
      dispatch,
      favoriteProducts,
      product,
      'favoriteProducts',
    );
  };

  return (
    <>
      {products.map(product => (
        <ProductItem
          product={product}
          key={product.id}
          addToCart={handleAddProductToCart}
          addToFavorites={handleAddProductToFavorites}
        />
      ))}
    </>
  );
};

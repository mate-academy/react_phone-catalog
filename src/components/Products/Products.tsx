import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
// eslint-disable-next-line max-len
import { addFavoriteProduct, removeFavoriteProduct } from '../../features/favoriteProducts/favoriteProductsSlice';
// eslint-disable-next-line max-len
import { addProductToCart, removeProductFromCart } from '../../features/shoppingCart/shoppingCartSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/product';
import { ProductItem } from '../ProductItem/ProductItem';

interface Props {
  products: Product[];
}

export const Products: FC<Props> = ({ products }) => {
  const [shoppingCart, setShoppingCart]
    = useLocalStorage('shoppingCart', []);
  const [favoriteProducts, setFavoriteProducts]
    = useLocalStorage('favoriteProducts', []);
  const dispatch = useAppDispatch();

  const addProducts = (
    existingProducts: Product[],
    setProducts: (products: Product[]) => void,
    product: Product,
    category?: string,
  ) => {
    if (!existingProducts.some(pr => pr.id === product.id)) {
      setProducts([...existingProducts, product]);

      if (category === 'favoriteProducts') {
        dispatch(addFavoriteProduct(product));
      } else {
        dispatch(addProductToCart(product));
      }
    } else {
      setProducts(existingProducts.filter(prod => prod.id !== product.id));

      if (category === 'favoriteProducts') {
        dispatch(removeFavoriteProduct(product));
      } else {
        dispatch(removeProductFromCart(product));
      }
    }
  };

  const handleAddProductToCart = (product: Product) => {
    addProducts(shoppingCart, setShoppingCart, product);
  };

  const handleAddProductToFavorites = (product: Product) => {
    addProducts(
      favoriteProducts,
      setFavoriteProducts,
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
          favoriteProducts={favoriteProducts}
          shoppingCart={shoppingCart}
        />
      ))}
    </>
  );
};

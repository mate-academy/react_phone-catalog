import { useContext, useEffect } from 'react';
import cn from 'classnames';
import { ProductContext } from '../../contexts/ProductContext';
import { Product } from '../../types/product';
import '../ProductCard/Product.scss';

type Props = {
  product: Product;
};

export const ActionButtonsDetail: React.FC<Props> = ({ product }) => {
  const {
    favouriteProducts,
    setFavouriteProducts,
    cartProducts,
    setCartProducts
  } = useContext(ProductContext);

  const isFavourite = favouriteProducts.some((favProduct) => favProduct.phoneId === product.phoneId);

  const isCart = cartProducts.some((cartProduct) => cartProduct.phoneId === product.phoneId)


  const handleAddFavourite = (product: Product) => {
    // Если продукт уже в избранном, уберите его из списка избранных
    if (isFavourite) {
      console.log('Removing from favorites:', product);
      const updatedFavourites = favouriteProducts.filter((favProduct) => favProduct.phoneId !== product.phoneId);

      setFavouriteProducts(updatedFavourites);
      localStorage.setItem('favouriteProducts', JSON.stringify(updatedFavourites));
      console.log('Updated favorites:', updatedFavourites);
    } else {
      // В противном случае, добавьте продукт в избранное
      console.log('Adding to favorites:', product);
      const newFavourites = [...favouriteProducts, product];

      setFavouriteProducts(newFavourites);
      localStorage.setItem('favouriteProducts', JSON.stringify(newFavourites));
      console.log('New favorites:', newFavourites);
    }
  };

  const handleAddProduct = (product: Product) => {
    if (isCart) {
      console.log('Removing from cart', product);
      const updatedCart = cartProducts.filter((cartProduct) => cartProduct.phoneId !== product.phoneId);

      setCartProducts(updatedCart);
      localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
      console.log('Updated cart:', updatedCart);
    } else {
      console.log('Adding to cart', product);
      const newCart = [...cartProducts, product];

      setCartProducts(newCart);
      localStorage.setItem('cartProducts', JSON.stringify(newCart));
      console.log('Updated cart:', newCart);
    }
  }

  useEffect(() => {
    // Извлечение избранных из localStorage при монтировании компонента
    const storedFavorites = localStorage.getItem('favouriteProducts');

    if (storedFavorites) {
      setFavouriteProducts(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartProducts');

    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className="product__button-container_detail">
      <button
        className={cn('product__button-add_detail',
        { 'product__button-add_detail-active': isCart })}
        onClick={() => handleAddProduct(product)}

      >
        Add to card
      </button>
      <button
        className={cn('product__button-favorite_detail',
          { 'product__button-favorite_detail-active': isFavourite })}
        onClick={() => handleAddFavourite(product)}
      />
    </div>
  );
};

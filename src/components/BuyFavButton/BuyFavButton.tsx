/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import '../../scss/blocks/addToCartButtons.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product | undefined;
};
export const BuyFavButton: React.FC<Props> = ({ product }) => {
  const [isAddedToCart, setIsAddedToCard] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartProducts, setCartProducts] = useState<string | null>(
    localStorage.getItem('products'),
  );
  const [favProducts, setFavProducts] = useState<string | null>(
    localStorage.getItem('favorites'),
  );

  const addedToCard = () => {
    if (cartProducts === null) {
      setIsAddedToCard(false);

      return;
    }

    const isAdded = JSON.parse(cartProducts)
      .some((prod: Product) => prod.id === product?.id);

    setIsAddedToCard(isAdded);
  };

  const addedToFavorite = () => {
    if (favProducts === null) {
      setIsFavorite(false);

      return;
    }

    const isAdded = JSON.parse(favProducts)
      .some((prod: Product) => prod.id === product?.id);

    setIsFavorite(isAdded);
  };

  useEffect(() => {
    addedToCard();
    addedToFavorite();
  }, [cartProducts, favProducts]);

  const handleAdd = (category: string) => {
    let newProduct;
    const setProducts = (category === 'products')
      ? setCartProducts
      : setFavProducts;

    if (category === 'products') {
      newProduct = {
        id: product?.id,
        quantity: 1,
        product,
      };
    } else {
      newProduct = product;
    }

    const addedProducts = localStorage.getItem(category);

    if (addedProducts === null || JSON.parse(addedProducts).length === 0) {
      localStorage.setItem(category, JSON.stringify([newProduct]));
      setProducts(JSON.stringify([newProduct]));

      return;
    }

    let newProducts = JSON.parse(addedProducts);

    const isProductAdded = newProducts
      .some((prod: Product) => prod.id === product?.id);

    if (isProductAdded) {
      newProducts = newProducts
        .filter((prod: Product) => prod.id !== product?.id);
    } else {
      newProducts = [...newProducts, newProduct];
    }

    if (newProducts.length === 0) {
      localStorage.removeItem(category);
      setProducts(null);

      return;
    }

    localStorage.setItem(category,
      JSON.stringify(newProducts));

    setProducts(JSON.stringify(newProducts));
  };

  return (
    <div className="addToCartButtons">
      <button
        type="button"
        className={classNames(
          'addToCartButtons__buy',
          { 'addToCartButtons__buy--added': isAddedToCart },
        )}
        onClick={() => handleAdd('products')}
      >
        {`${!isAddedToCart ? 'Add' : 'Added'} to cart`}
      </button>
      <button
        data-cy="addToFavorite"
        type="button"
        className={classNames(
          'addToCartButtons__like',
          'button',
          { 'addToCartButtons__like--selected': isFavorite },
        )}
        onClick={() => handleAdd('favorites')}
      >
        &nbsp;
      </button>
    </div>
  );
};

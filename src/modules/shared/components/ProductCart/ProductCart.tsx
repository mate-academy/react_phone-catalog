import React, { useEffect, useState } from 'react';
import { Char, ShowCharacteristics } from '../ShowCharacteristics';
import { Price } from '../Price/Price';
import { useCart } from '../Context/CartContext';
import cn from 'classnames';
import { useFavorites } from '../Context/FavoritesContext';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';

interface Props {
  product: Product;
  prevPrice?: number;
  currentPrice: number;
  additionalClass?: string;
  refObject?: React.LegacyRef<HTMLDivElement>;
}

export const ProductCart: React.FC<Props> = ({
  product,
  prevPrice = null,
  currentPrice,
  additionalClass = '',
  refObject,
}) => {
  const { cart, toggleProductInCart, isInCart } = useCart();
  const { favorites, toggleFavorites, isFavorited } = useFavorites();
  const [inCart, setInCart] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const charsToShow: Array<Char> = [
    { title: 'Screen', value: product.screen },
    { title: 'Capacity', value: product.capacity },
    { title: 'RAM', value: product.ram },
  ];
  const inCartButtonText = inCart ? 'In cart' : 'Add to cart';

  useEffect(() => {
    setInCart(isInCart?.(product) || false);
  }, [cart, product, isInCart]);

  useEffect(() => {
    setFavorited(isFavorited?.(product) || false);
  }, [favorites, isFavorited, product]);
  // #endregion

  return (
    <div
      className={`productCart__container ${additionalClass}`}
      ref={refObject}
    >
      <Link
        to={{ pathname: `/${product.category}/${product.itemId}` }}
        className="productCart__link"
      >
        <img
          src={`${import.meta.env.BASE_URL}/${product.image}`}
          alt={product.name}
          className="productCart__photo"
        />
      </Link>
      <h4 className="productCart__title">{product.name}</h4>
      <Price fullPrice={prevPrice} priceDiscount={currentPrice} />
      <ShowCharacteristics chars={charsToShow} />
      <div className="productCart__buttons">
        <button
          className={cn('button', 'button--inverted', {
            'button--addedToCart': inCart,
          })}
          onClick={() => toggleProductInCart?.(product)}
        >
          {inCartButtonText}
        </button>
        <button className="button" onClick={() => toggleFavorites?.(product)}>
          <Icon
            iconSlug="Heart"
            className={cn({ 'icon--favorited': favorited })}
          />
        </button>
      </div>
    </div>
  );
};

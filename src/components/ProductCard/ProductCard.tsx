import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../types/product';
import { PrimaryButton } from '../UI/PrimaryButton/PrimaryButton';
import { FavButton } from '../UI/FavButton/FavButton';
import { SpecTable } from '../SpecTable/SpecTable';
import { useCart } from '../../contexts/cartContext';
import './ProductCard.scss';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    image,
    name,
    price,
    screen,
    capacity,
    ram,
    fullPrice,
    itemId,
    category,
  } = product as Product;
  const { addCartItem, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === itemId);

  const specsToShow = useMemo(
    () => ({
      Screen: screen,
      Capacity: capacity,
      RAM: ram,
    }),
    [product],
  );

  return (
    <div className="product-card">
      <Link to={`/${category}/${itemId}`} className="product-card__link">
        <img className="product-card__image" src={`_new/${image}`} alt={name} />

        <p className="product-card__name">{name}</p>
      </Link>
      <p className="product-card__price">
        {`$${price}`}
        {fullPrice - price > 0 && (
          <span className="product-card__price--strike">{`$${fullPrice}`}</span>
        )}
      </p>

      <div className="product-card__spec">
        <SpecTable
          specifications={specsToShow}
          style={{
            fontSize: 12,
            fontWeight: 600,
          }}
        />
      </div>

      <div className="product-card__controls">
        <PrimaryButton
          onClick={() => addCartItem(product)}
          width={176}
          height={40}
          isActive={isInCart}
        >
          Add to Cart
        </PrimaryButton>

        <FavButton
          product={product}
          productId={itemId}
          size={40}
        />
      </div>
    </div>
  );
};

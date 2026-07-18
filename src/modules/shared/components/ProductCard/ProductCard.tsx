import React from 'react';
import { Product } from '../../../../types/Product';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { Line } from '../Line';
import { SpecsProduct } from '../SpecsProduct';
import { BlockPrice } from '../BlockPrice';
import { AddToCartButton } from '../Buttons/AddToCartButton';

type Props = {
  item: Product;
  className: string;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  item,
  className,
  showDiscount = false,
}) => {
  return (
    <div className={`product-card ${className}`}>
      <Link
        to={`/product/${item.itemId}`}
        className="product-card__block-image"
      >
        <img
          src={item.image}
          alt={item.itemId}
          className="product-card__image"
        />
      </Link>
      <Link
        to={`/product/${item.itemId}`}
        className="product-card__block-title"
      >
        <p className="product-card__title">{item.name}</p>
      </Link>
      <BlockPrice
        className="product-card__block-price"
        fullPrice={item.fullPrice}
        price={item.price}
        showDiscount={showDiscount}
        sizePrice={22}
      />
      <Line />
      <SpecsProduct
        className="product-card__specs-product"
        specs={[
          { key: 'ram', value: item.ram },
          { key: 'screen', value: item.screen },
          { key: 'capacity', value: item.capacity },
        ]}
      />
      <AddToCartButton
        className="product-card__add-to-cart-button"
        item={item}
      />
    </div>
  );
};

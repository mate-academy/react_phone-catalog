import React from 'react';

import { Link } from 'react-router-dom';
import { Product } from '@/shared/types';

import { ProductActions } from '../ProductActions';
import { ProductSpecsItem } from '../ProductSpecsItem';
import { ProductPrice } from '../ProductPrice';

import './ProductCard.scss';
import { ImageWithFallback } from '../ImageWithFallback';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className="product-card">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="product-card__image-container"
      >
        <ImageWithFallback
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt={product.name}
          className="product-card__image"
        />
      </Link>

      {/* 2. Product Naming */}
      <h3 className="product-card__title">
        <Link to={`/${product.category}/${product.itemId}`}>
          {product.name}
        </Link>
      </h3>

      {/* 3. Price-block */}
      <ProductPrice
        className="product-card__price-block"
        price={product.price}
        fullPrice={product.fullPrice}
      />

      {/* 4. Specs-block */}
      <dl className="product-card__specs product-specs">
        <ProductSpecsItem label="Screen" value={product.screen} />
        <ProductSpecsItem label="Capacity" value={product.capacity} />
        <ProductSpecsItem label="RAM" value={product.ram} />
      </dl>

      {/* Buttons */}
      <ProductActions product={product} className="product-card__actions" />
    </article>
  );
};

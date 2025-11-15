import React, { useContext, useEffect, useRef } from 'react';
import './ProductCard.scss';
import type { Product } from '../../../types/Product';
import { Link, useSearchParams } from 'react-router-dom';
import { BtnAdd } from '../../Buttons/BtnAdd';
import { BtnLike } from '../../Buttons/BtnLike';
import { ProductPrice } from '../ProductPrice';
import { ProductPropertyTable } from '../ProductPropertyTable';
import { SliderContext } from '../../../context/SliderContext';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [searchParams] = useSearchParams();
  const { setSlideWidth } = useContext(SliderContext);
  const slideRef = useRef<HTMLDivElement>(null);
  const { image, name, price, screen, capacity, ram, fullPrice } = product;

  useEffect(() => {
    const handleResizeSlide = () => {
      if (slideRef.current) {
        setSlideWidth(slideRef.current.offsetWidth);
      }
    };

    handleResizeSlide();

    window.addEventListener('resize', handleResizeSlide);

    return () => window.removeEventListener('resize', handleResizeSlide);
  }, [setSlideWidth]);

  const productProperties = [
    { name: 'screen', value: screen },
    { name: 'capacity', value: capacity },
    { name: 'ram', value: ram },
  ];

  return (
    <div ref={slideRef} className="product-card">
      <div className="product-card__container">
        <Link
          className="product-card__image-wrapper"
          to={`/${product.category}/${product.itemId}`}
          state={{
            search: searchParams.toString(),
          }}
          id={product.itemId}
        >
          <img src={`${image}`} className="product-card__image" />
        </Link>
        <div className="product-card__container-info">
          <Link
            className="product-card__title"
            to={`/${product.category}/${product.itemId}`}
            state={{
              search: searchParams.toString(),
            }}
            id={product.itemId}
          >
            <p className="product-card__title">{name}</p>
          </Link>
          <ProductPrice price={price} fullPrice={fullPrice} textStyle="small" />

          <ProductPropertyTable
            properties={productProperties}
            textStyle="small"
          />

          <div className="product-card__btns">
            <BtnAdd selectedProductID={product.itemId} />
            <BtnLike buttonSize="small" productId={product.itemId} />
          </div>
        </div>
      </div>
    </div>
  );
};

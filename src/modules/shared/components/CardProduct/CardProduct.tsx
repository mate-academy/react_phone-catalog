import React from 'react';
import { Product } from '../../../../types/ProductType';
import cardClass from './cardProduct.module.scss';
import cn from 'classnames';
import { TechSpecsList } from '../TechSpecsList';
import { Button } from '../Button';
import { useNavigateToProduct } from '../../../../hooks/useNavigateToProducts';
import { Boundary } from '../Boundary';
import { ProductPrice } from '../ProductPrice';

interface Props {
  product: Product;
}

export const CardProduct: React.FC<Props> = React.memo(({ product }) => {
  const redirect = useNavigateToProduct();
  const handleClick = () => redirect(product);

  return (
    <article className={cn(cardClass['card-product'])} onClick={handleClick}>
      <div className={cn(cardClass['card-product__content'])}>
        <div className={cn(cardClass['card-product__top'])}>
          <img
            src={product.image}
            alt={product.name}
            className={cn(cardClass['card-product__img'])}
            loading="lazy"
          />
          <div className={cn(cardClass['card-product__text-content'])}>
            <p className={cn(cardClass['card-product__text'])}>
              {product.name}
            </p>
          </div>
        </div>
        <div className={cn(cardClass['card-product__price-content'])}>
          <ProductPrice
            fullPrice={product.fullPrice}
            priceDiscount={product.price}
          />
        </div>
        <Boundary />
        <TechSpecsList product={product} />
        <div onClick={e => e.stopPropagation()}>
          <Button isIcon={true} product={product} />
        </div>
      </div>
    </article>
  );
});

CardProduct.displayName = 'CardProduct';

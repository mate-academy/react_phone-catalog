/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Phone } from '../../types/phone';
import { ProductCard } from '../ProductCard';
import './productslist.scss';

type Props = {
  products: Phone[];
};

export const ProductsList: React.FC<Props> = ({
  products,
}) => {
  const { pathname } = useLocation();
  const isFavPage = pathname.includes('favorites');

  if (isFavPage) {
    return (
      <TransitionGroup
        className="products-list"
      >
        {products.map((product) => (
          <CSSTransition
            key={product.id}
            timeout={300}
            classNames="list-item-fade"
          >
            <ProductCard key={product.id} product={product} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }

  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

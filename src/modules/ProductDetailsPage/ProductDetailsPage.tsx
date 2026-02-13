import React, { useContext } from 'react';
import cn from 'classnames';
import style from './ProductDetailsPage.module.scss';
import { ProductDetailContext } from '../../context/ProductDetailContext';
import { CardsCariusel } from '../shared/components/CardsCarousel';
import { CategoriesType } from '../../types/PagesType';
import { ProductDetailCard } from './components/ProductDetailCard';
import { NotFoundPage } from '../NotFoundPage';

export const ProductDetailsPage: React.FC = React.memo(() => {
  const { detailProduct } = useContext(ProductDetailContext);

  if (!detailProduct) {
    return <NotFoundPage />;
  }

  return (
    <section className={cn(style['detail-page'])}>
      <div className={cn(style['detail-page__card-content'], 'container')}>
        <h2 className={cn(style['detail-page__title'])}>
          {detailProduct?.name}
        </h2>
        <div>
          <ProductDetailCard />
        </div>
      </div>
      <div>
        <CardsCariusel
          title={'You may also like'}
          category={detailProduct?.category as CategoriesType}
        />
      </div>
    </section>
  );
});

ProductDetailsPage.displayName = 'ProductDetailsPage';

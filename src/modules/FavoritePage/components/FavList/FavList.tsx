import React from 'react';
import favListClass from './favList.module.scss';
import cn from 'classnames';
import { CardProduct } from '../../../shared/components/CardProduct';
import { Product } from '../../../../types/ProductType';

interface Props {
  products: Product[];
}

export const FavList: React.FC<Props> = React.memo(({ products }) => {
  return (
    <div className={cn(favListClass['fav-list'])}>
      {products.map(product => (
        <div key={product.id} className={cn(favListClass['fav-list__item'])}>
          <CardProduct product={product} />
        </div>
      ))}
    </div>
  );
});
FavList.displayName = 'FavList';

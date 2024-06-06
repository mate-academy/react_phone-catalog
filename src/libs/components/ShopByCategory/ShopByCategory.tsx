import cn from 'classnames';

import { ProductCategory } from '../../types';
import { CategoryCard } from '../CategoryCard';
import { SectionHeader } from '../SectionHeader';

import './ShopByCategory.scss';

type Props = {
  classNames?: string;
};

export const ShopByCategory: React.FC<Props> = ({ classNames }) => {
  return (
    <section className={cn('shop-by-category', classNames)}>
      <SectionHeader title="Shop by category" />
      <div className="shop-by-category__cards" data-cy="categoryLinksContainer">
        <CategoryCard pass={ProductCategory.Phones} title="Mobile phones" />
        <CategoryCard pass={ProductCategory.Tablets} />
        <CategoryCard pass={ProductCategory.Accessories} />
      </div>
    </section>
  );
};

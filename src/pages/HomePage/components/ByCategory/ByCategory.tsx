import React, { useMemo } from 'react';
import { useStateContext } from '../../../../state/state';
import { Categories } from '../../../../enums';
import './ByCategory.scss';
import { CategoryItem } from './components/CategoryItem/CategoryItem';
import { getTitle } from '../../../ProductsPage/helpers/getTitle';

type Props = {};

export const ByCategory: React.FC<Props> = () => {
  const { state } = useStateContext();

  const productsByCategory = useMemo(() => {
    return state.products.reduce(
      (acc: { [key: string]: number }, product: { category: string }) => {
        return {
          ...acc,
          [product.category]: (acc[product.category] || 0) + 1,
        };
      },
      {},
    );
  }, [state.products]);

  const categories = Object.values(Categories).map(category => ({
    category,
    imageSrc: `/img/${category.toLowerCase()}-category.png`,
  }));

  return (
    <section className="home-page__by-category by-category">
      <h2 className="by-category__title typography__h2">Shop by category</h2>
      <ul className="by-category__wrapper">
        {categories.map(({ category, imageSrc }) => (
          <CategoryItem
            key={category}
            category={category}
            imageSrc={imageSrc}
            title={getTitle(category)}
            count={productsByCategory[category]}
          />
        ))}
      </ul>
    </section>
  );
};

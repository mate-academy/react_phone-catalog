import React, { useContext, useMemo } from 'react';

import { ProductsContext } from '../../store/ProductsContext';

import './Categories.scss';
import { API_URL } from '../../utils/api';
import { CategoriesCard } from '../CategoriesCard';

export const Categories: React.FC = () => {
  const { products } = useContext(ProductsContext);

  const phonesCount = useMemo(
    () => products.filter(product => product.category === 'phones').length,
    [products],
  );

  const tabletsCount = useMemo(
    () => products.filter(product => product.category === 'tablets').length,
    [products],
  );

  const accessoriesCount = useMemo(
    () => products.filter(product => product.category === 'accessories').length,
    [products],
  );

  const categories = useMemo(
    () => [
      {
        path: '/phones',
        src: `${API_URL}/img/category-phones.png`,
        alt: 'Phones Category',
        title: 'Mobile phones',
        count: phonesCount,
      },
      {
        path: '/tablets',
        src: `${API_URL}/img/category-tablets.png`,
        alt: 'Tablets Category',
        title: 'Tablets',
        count: tabletsCount,
      },
      {
        path: '/accessories',
        src: `${API_URL}/img/category-accessories.png`,
        alt: 'Accessories Category',
        title: 'Accessories',
        count: accessoriesCount,
      },
    ],
    [phonesCount, tabletsCount, accessoriesCount],
  );

  return (
    <section className="Categories Main__categories">
      <h1 className="Categories__title">Shop by category</h1>

      {categories.map(category => (
        <CategoriesCard category={category} />
      ))}
    </section>
  );
};

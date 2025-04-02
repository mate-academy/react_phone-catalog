import React, { useContext } from 'react';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { ProductsContext } from '../../../../context/ProductsContext';

export const Categories = () => {
  const { categories } = useContext(ProductsContext);

  return (
    <section>
      <SectionTitle title="Shop by category" />
      {categories.map(category => (
        <article key={category}>{category}</article>
      ))}
    </section>
  );
};

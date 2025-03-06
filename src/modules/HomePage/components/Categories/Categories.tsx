import React, { useContext } from 'react';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { CategoriesContext } from '../../../../context/СategoriesContext';

export const Categories = () => {
  const categories = useContext(CategoriesContext);

  return (
    <section>
      <SectionTitle title="Shop by category" />
      {categories.map(category => (
        <article key={category}>{category}</article>
      ))}
    </section>
  );
};

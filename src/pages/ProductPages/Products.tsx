import React from 'react';
import { useParams } from 'react-router-dom';
import { Category, isCategory } from '../../types/categories';

const Products: React.FC = () => {
  const params = useParams();
  const raw = params.category;
  const category: Category = isCategory(raw) ? raw : 'phones';

  return (
    <section className="products-page">
      <h2>Products — {category}</h2>
      <p>
        Here will be a list of products for the <strong>{category}</strong>{' '}
        category.
      </p>
    </section>
  );
};

export default Products;

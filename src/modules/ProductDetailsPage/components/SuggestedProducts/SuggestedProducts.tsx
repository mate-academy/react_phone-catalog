import React from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  category: string;
  images: string[];
};

type Props = {
  currentProduct: Product;
  allProducts: Product[];
};

export const SuggestedProducts: React.FC<Props> = ({
  currentProduct,
  allProducts,
}) => {
  const getSuggestedProducts = () => {
    const filtered = allProducts.filter(p => p.id !== currentProduct.id);

    return filtered.sort(() => 0.5 - Math.random()).slice(0, 4);
  };

  const suggested = getSuggestedProducts();

  return (
    <section className="suggested-products">
      <h2>You may also like</h2>
      <div className="products-grid">
        {suggested.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="product-card">
            <img src={p.images[0]} alt={p.name} />
            <p>{p.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

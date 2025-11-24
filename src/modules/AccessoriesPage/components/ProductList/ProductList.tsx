import React from 'react';

type Product = {
  id: number;
  name: string;
  image?: string;
  price: number;
  discount: number;
  year: number;
};

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="products-list">
      {products.map(p => (
        <article key={p.id} className="product-card">
          <img
            src={
              p.image || 'https://via.placeholder.com/150x150?text=Accessory'
            }
            alt={p.name}
          />
          <h3>{p.name}</h3>
          <p>
            R$ {(p.price - p.discount).toFixed(2)}{' '}
            <span className="old-price">R$ {p.price.toFixed(2)}</span>
          </p>
          <p className="year">Year: {p.year}</p>
        </article>
      ))}
    </div>
  );
};

import React, { useContext } from 'react';
import { Card } from '../Card';
import { Context } from '../context';
import { Location } from '../Location';

export const Favorites: React.FC = () => {
  const { favorite } = useContext(Context);

  return (favorite && favorite.length !== 0) ? (
    <main className="favorites" style={{ gridTemplateRows: `repeat(${Math.ceil(favorite.length / 4)}, 1fr)` }}>
      <Location />
      <h1>Favorites</h1>
      <h5>
        {favorite.length}
        {' '}
        items
      </h5>
      <div className="favorites__list">
        {favorite.map(product => (
          <div className="favorites__product" key={product.id}>
            <Card product={product} />
          </div>
        ))}
      </div>

    </main>
  ) : (<main><h1>No products in favorites</h1></main>);
};

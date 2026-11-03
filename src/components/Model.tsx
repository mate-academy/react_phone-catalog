import { Product } from '../interface/Product';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ModelProps {
  item: Product;
  catalog?: boolean;
}

const Model = ({ item, catalog }: ModelProps) => {
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    setFavorite(favorites.includes(item.name));
  }, [item.name]);

  return (
    <article className="model__item">
      <img
        src={`/${catalog ? item.images?.[0] : item.image}`}
        alt={item.name}
        className="model__image"
      />
      <h2 className="model__title">{item.name}</h2>
      <h3 className="model__price">{item.price}</h3>
      <table className="model__table">
        <tr>
          <td>Screen</td>
          <td>{item.screen}</td>
        </tr>
        <tr>
          <td>Capacity</td>
          <td>{item.capacity}</td>
        </tr>
        <tr>
          <td>RAM</td>
          <td>{item.ram}</td>
        </tr>
      </table>
      <div className="model__footer">
        <button
          className="model_button"
          onClick={() => navigate(`/products/${encodeURIComponent(item.name)}`)}
        >
          Add to cart
        </button>
        <button
          className="model__heart"
          onClick={() => {
            const favorites = JSON.parse(
              localStorage.getItem('favorites') || '[]',
            );

            if (favorite) {
              const updatedFavorites = favorites.filter(
                (name: string) => name !== item.name,
              );

              localStorage.setItem(
                'favorites',
                JSON.stringify(updatedFavorites),
              );

              setFavorite(false);
            } else {
              favorites.push(item.name);
              localStorage.setItem('favorites', JSON.stringify(favorites));
              setFavorite(true);
            }
          }}
        >
          <img
            src={favorite ? '/img/heart-full.svg' : '/img/heart.svg'}
            alt="heart icon svg"
          />
        </button>
      </div>
    </article>
  );
};

export default Model;

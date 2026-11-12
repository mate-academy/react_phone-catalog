import { Product } from '../interface/Product';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ModelProps {
  item: Product;
  catalog?: boolean;
  changeEffect: (nam: string) => void;
}

const Model = ({ item, catalog, changeEffect }: ModelProps) => {
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    setFavorite(favorites.includes(item.name));
  }, [item.name]);

  return (
    <article className="model__item">
      <button
        className="model__button-image"
        onClick={() => {
          navigate(`/products/${encodeURIComponent(item.name)}`);
        }}
      >
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/${catalog ? item.images?.[0] : item.image}`}
          alt={item.name}
          className="model__image"
        />
      </button>
      <button
        className="model__title"
        onClick={() => {
          navigate(`/products/${encodeURIComponent(item.name)}`);
        }}
      >
        {item.name}
      </button>
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
          onClick={() => {
            const cart: string[] = JSON.parse(
              localStorage.getItem('cart') || '[]',
            );

            if (!cart.includes(item.name)) {
              cart.push(item.name);
              localStorage.setItem('cart', JSON.stringify(cart));
            }

            changeEffect(item.name);
          }}
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
            src={
              favorite
                ? `${import.meta.env.VITE_PUBLIC_URL}/img/heart-full.svg`
                : `${import.meta.env.VITE_PUBLIC_URL}/img/heart.svg`
            }
            alt="heart icon svg"
          />
        </button>
      </div>
    </article>
  );
};

export default Model;

import { Product, LocalProduct } from '../interface/Product';
import { useNavigate } from 'react-router-dom';

interface ModelProps {
  item: Product;
  catalog?: boolean;
  changeEffect: (nam: string) => void;
  favorites: string[];
  setFavorites: (list: string[]) => void;
  products: LocalProduct[];
  setProducts: (list: LocalProduct[]) => void;
}

const Model = ({
  item,
  catalog,
  changeEffect,
  favorites,
  setFavorites,
  products,
  setProducts,
}: ModelProps) => {
  const navigate = useNavigate();

  const favorite = favorites.includes(item.name);

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
            changeEffect(item.name);

            const itemId = item.itemId ?? item.id;

            if (!products.some(c => c.id === itemId)) {
              const updated = [
                ...products,
                { id: itemId, color: item.color, title: item.name },
              ];

              setProducts(updated);
              localStorage.setItem('cart', JSON.stringify(updated));
            }
          }}
        >
          Add to cart
        </button>
        <button
          className="model__heart"
          onClick={() => {
            const updated = favorite
              ? favorites.filter(name => name !== item.name)
              : [...favorites, item.name];

            setFavorites(updated);
            localStorage.setItem('favorites', JSON.stringify(updated));
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

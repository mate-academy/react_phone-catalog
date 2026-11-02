import { Product } from '../interface/Product';
import { useNavigate } from 'react-router-dom';

interface ModelProps {
  item: Product;
  catalog?: boolean;
}

const Model = ({ item, catalog }: ModelProps) => {
  const navigate = useNavigate();

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
        <div className="model__heart">
          <img src="/img/heart.svg" alt="heart icon svg" />
        </div>
      </div>
    </article>
  );
};

export default Model;

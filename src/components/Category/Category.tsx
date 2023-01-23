import { Link } from 'react-router-dom';
import './Category.scss';

export const Category: React.FC = () => {
  return (
    <section className="category">
      <h2 className="category__title">
        Shop by category
      </h2>

      <ul className="category__list">
        <li className="category__item">
          <Link to="/phones">
            <div
              className="category__photo--phones category__photo"
            />
            <h2 className="category__name">Mobile phones</h2>
            <p className="category__amount">amount</p>
          </Link>
        </li>
        <li className="category__item">
          <Link to="/tablets">
            <div
              className="category__photo--tablets category__photo"
            />
            <h2 className="category__name">Tabets</h2>
            <p className="category__amount">amount</p>
          </Link>
        </li>
        <li className="category__item">
          <Link to="accessories">
            <div
              className="category__photo--accessories category__photo"
            />
            <h2 className="category__name">Accessories</h2>
            <p className="category__amount">amount</p>
          </Link>
        </li>
      </ul>
    </section>
  );
};

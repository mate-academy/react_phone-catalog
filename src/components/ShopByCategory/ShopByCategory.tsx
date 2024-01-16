import { Link } from 'react-router-dom';
import './shop-by-category.scss';

type Props = {
  phonesQuantity: number,
  tabletsQuantity: number,
  accessoriesQuantity: number,
};

export const ShopByCategory: React.FC<Props> = ({
  phonesQuantity,
  tabletsQuantity,
  accessoriesQuantity,
}) => {
  return (
    <section className="shop-by-category page__section">
      <div className="shop-by-category__top">
        <h1 className="shop-by-category__title">Shop by category</h1>
      </div>
      <ul className="category__list">
        <li className="category__item">
          <Link className="category__link phones" to="/phones">
            <div className="category__image" />
            <h2 className="category__title">Mobile phones</h2>
            <p className="category__quantity">{`${phonesQuantity} models`}</p>
          </Link>
        </li>
        <li className="category__item">
          <Link className="category__link tablets" to="/tablets">
            <div className="category__image" />
            <h2 className="category__title">Tablets</h2>
            <p className="category__quantity">{`${tabletsQuantity} models`}</p>
          </Link>
        </li>
        <li className="category__item">
          <Link className="category__link accessories" to="/accessories">
            <div className="category__image" />
            <h2 className="category__title">Accessories</h2>
            <p className="category__quantity">{`${accessoriesQuantity} models`}</p>
          </Link>
        </li>
      </ul>
    </section>
  );
};

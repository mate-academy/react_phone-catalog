import { Link, useLoaderData } from 'react-router-dom';
import { categories } from '../../helpers/categoryImg';
import { Product } from '../../types/Product';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const data = useLoaderData() as Product[];

  const phonesAmount = data
    .filter(product => product.category === 'phones').length;

  const tabletsAmount = data
    .filter(product => product.category === 'tablet').length;

  const accessoriesAmount = data
    .filter(product => product.category === 'accessory').length;

  return (
    <div className="category">
      <h1 className="category__title">Shop by category</h1>
      <div
        className="category__content"
        data-cy="categoryLinksContainer"
      >
        <div>
          <Link to="/phones">
            <img
              src={categories.phones}
              alt="Mobile phones"
              className="category__img"
            />
          </Link>
          <Link
            to="/phones"
            className="category__category-link"
          >
            <h3
              className="category__category-name"
            >
              Mobile phones
            </h3>
          </Link>
          <span className="category__category-amount">{`${phonesAmount} models`}</span>
        </div>

        <div>
          <Link to="/tablets">
            <img
              src={categories.tablets}
              alt="Tablets"
              className="category__img"
            />
          </Link>
          <Link
            to="/tablets"
            className="category__category-link"
          >
            <h3
              className="category__category-name"
            >
              Tablets
            </h3>
          </Link>
          <span className="category__category-amount">{`${tabletsAmount} models`}</span>
        </div>

        <div>
          <Link
            to="/accessories"
          >
            <img
              src={categories.accessories}
              alt="Accessories"
              className="category__img"
            />
          </Link>
          <Link
            to="/accessories"
            className="category__category-link"
          >
            <h3
              className="category__category-name"
            >
              Accessories
            </h3>
          </Link>
          <span className="category__category-amount">{`${accessoriesAmount} models`}</span>
        </div>
      </div>
    </div>
  );
};

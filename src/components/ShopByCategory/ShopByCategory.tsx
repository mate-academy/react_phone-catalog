/* eslint-disable max-len */
import { Link } from 'react-router-dom';

import phones from '../../images/category-phones.png';
import tablets from '../../images/category-tablets.png';
import accessories from '../../images/category-accessories.png';
import { useProducts } from '../../store/ProductsContext';
import { ProductCategory } from '../../types/ProductCategory';
import { backToTop } from '../../utils/constants';

import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const products = useProducts();

  const countOfPhones = products
    .filter(product => product.category === ProductCategory.Phone).length;
  const countOfTablets = products
    .filter(product => product.category === ProductCategory.Tablet).length;
  const countOfAccessories = products
    .filter(product => product.category === ProductCategory.Accessory).length;

  return (
    <section className="category">
      <div className="category__content">
        <h1 className="title">
          Shop by category
        </h1>

        <ul className="category__list" data-cy="categoryLinksContainer">
          <li className="category__item">
            <Link
              to="/phones"
              className="category__image-link category__image-link--phones"
              onClick={backToTop}
            >
              <img
                src={phones}
                alt="phones"
                className="category__image"
              />
            </Link>

            <div className="category__name-block">
              <Link
                to="/phones"
                className="category__name"
                onClick={backToTop}
              >
                Mobile phones
              </Link>

              <span className="category__amount">
                {`${countOfPhones} models`}
              </span>
            </div>
          </li>

          <li className="category__item">
            <Link
              to="/tablets"
              className="category__image-link category__image-link--tablets"
              onClick={backToTop}
            >
              <img
                src={tablets}
                alt="tablets"
                className="category__image"
              />
            </Link>

            <div className="category__name-block">
              <Link
                to="/phones"
                className="category__name"
                onClick={backToTop}
              >
                Tablets
              </Link>

              <span className="category__amount">
                {`${countOfTablets} models`}
              </span>
            </div>
          </li>

          <li className="category__item">
            <Link
              to="/accessories"
              className="category__image-link category__image-link--accessories"
              onClick={backToTop}
            >
              <img
                src={accessories}
                alt="accessories"
                className="category__image"
              />
            </Link>

            <div className="category__name-block">
              <Link
                to="/phones"
                className="category__name"
                onClick={backToTop}
              >
                Accessories
              </Link>

              <span className="category__amount">
                {`${countOfAccessories} models`}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

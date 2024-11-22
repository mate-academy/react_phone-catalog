import { useContext } from 'react';
import './Categories.module.scss';
import { CatalogContext } from '../CatalogProvider';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const { phones, tablets, accessories } = useContext(CatalogContext);

  return (
    <div className="categories">
      <div className="categories__header">Shop by category</div>
      <div className="categories__content">
        <div className="categories__option">
          <Link to="/phones">
            <img
              src="img/category-phones.png"
              alt="phones"
              className="categories__image"
            />
          </Link>
          <h2 className="categories__title">Phones</h2>
          <span className="categories__amount">{phones.length} models</span>
        </div>
        <div className="categories__option">
          <Link to="/tablets">
            <img
              src="img/category-tablets.png"
              alt="tablets"
              className="categories__image"
            />
          </Link>
          <h2 className="categories__title">Tablets</h2>
          <span className="categories__amount">{tablets.length} models</span>
        </div>
        <div className="categories__option">
          <Link to="/accessories">
            <img
              src="img/category-accessories.png"
              alt="accessories"
              className="categories__image"
            />
          </Link>
          <h2 className="categories__title">Accessories</h2>
          <span className="categories__amount">
            {accessories.length} models
          </span>
        </div>
      </div>
    </div>
  );
};

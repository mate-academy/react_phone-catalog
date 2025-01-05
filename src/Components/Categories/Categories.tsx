import { useContext } from 'react';
import category from './Categories.module.scss';
import { CatalogContext } from '../CatalogProvider';
import { Link } from 'react-router-dom';

export const Categories = () => {
  const { phones, tablets, accessories, themeSwitcher } =
    useContext(CatalogContext);

  return (
    <div
      className={category.categories}
      data-theme={themeSwitcher ? 'dark' : 'light'}
    >
      <div className={category.header}>Shop by category</div>
      <div className={category.content}>
        <div className={category.option}>
          <Link to="/phones" className={category.link}>
            <img
              src="img/category-phones.png"
              alt="phones"
              className={category.image}
              style={{
                backgroundColor: '#6D6474',
              }}
            />
          </Link>
          <h2 className={category.title}>Phones</h2>
          <span className={category.amount}>{phones.length} models</span>
        </div>
        <div className={category.option}>
          <Link to="/tablets" className={category.link}>
            <img
              src="img/category-tablets.png"
              alt="tablets"
              className={category.image}
              style={{
                backgroundColor: '#8D8D92',
              }}
            />
          </Link>
          <h2 className={category.title}>Tablets</h2>
          <span className={category.amount}>{tablets.length} models</span>
        </div>
        <div className={category.option}>
          <Link to="/accessories" className={category.link}>
            <img
              src="img/category-accessories.png"
              alt="accessories"
              className={category.image}
              style={{
                backgroundColor: '#D53C51',
              }}
            />
          </Link>
          <h2 className={category.title}>Accessories</h2>
          <span className={category.amount}>{accessories.length} models</span>
        </div>
      </div>
    </div>
  );
};

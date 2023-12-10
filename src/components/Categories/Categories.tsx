import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Title } from '../Title';
import { ProductsContext } from '../../context/ProductsContext';
import './Categories.scss';

export const Categories = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="categories">
      <Title title="Shop by category" />
      <div className="categories__content">
        <Link
          to="../phones"
          className="categories__item"
        >
          <div className="categories__image categories__image--phones">
            <img
              className="categories__image-content
              categories__image-content--phones"
              src="_new/img/category-phones.png"
              alt="phones"
            />
          </div>
          <div className="categories__info">
            <h3 className="categories__info-title">
              Mobile phones
            </h3>
            <p className="categories__info-count">
              {`${products.filter(product => product.type === 'phone')
                .length} models`}
            </p>
          </div>
        </Link>
        <Link
          to="../tablets"
          className="categories__item"
        >
          <div className="categories__image categories__image--tablets">
            <img
              className="categories__image-content
                categories__image-content--tablets"
              src="_new/img/category-tablets.png"
              alt="tablets"
            />
          </div>
          <div className="categories__info">
            <h3 className="categories__info-title">
              Tablets
            </h3>
            <p className="categories__info-count">
              {`${products.filter(product => product.type === 'tablet')
                .length} models`}
            </p>
          </div>
        </Link>
        <Link
          to="../accessories"
          className="categories__item"
        >
          <div className="categories__image categories__image--accessories">
            <img
              className="categories__image-content
                categories__image-content--accessories"
              src="_new/img/category-accessories.png"
              alt="accessories"
            />
          </div>
          <div className="categories__info">
            <h3 className="categories__info-title">
              Accessories
            </h3>
            <p className="categories__info-count">
              {`${products.filter(product => product.type === 'accessory')
                .length} models`}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

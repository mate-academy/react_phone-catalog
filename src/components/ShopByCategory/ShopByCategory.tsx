import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CategoriesList from '../../api/CategoriesList.json';
import { Context } from '../../context/Context';
import './ShopByCategory.scss';

export const ShopByCategory: React.FC = () => {
  const { products } = useContext(Context);

  const phones = useMemo(() => (
    products.filter(product => product.type === 'phone')
  ), [products]);

  const tablets = useMemo(() => (
    products.filter(product => product.type === 'tablet')
  ), [products]);

  const accessories = useMemo(() => (
    products.filter(product => product.type === 'accessory')
  ), [products]);

  const categoryCount = (type: string) => {
    switch (type) {
      case 'phones':
        return phones.length;

      case 'tablets':
        return tablets.length;

      case 'accessory':
        return accessories.length;

      default:
        return 0;
    }
  };

  return (
    <div className="categories">
      <h2 className="categories__title">
        Shop by category
      </h2>
      <div className="categories__container">
        {CategoriesList.map(type => (
          <div
            key={type.type}
            className="categories__item-container"
          >
            <Link
              key={type.type}
              to={type.url}
              className="categories__item"
              data-cy="categoryLinksContainer"
            >
              <img
                className="categories__image"
                src={type.image}
                alt={type.title}
              />

              <h3 className="categories__name">
                {type.title}
              </h3>

              <h4 className="categories__count">
                {`${categoryCount(type.type)} models`}
              </h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

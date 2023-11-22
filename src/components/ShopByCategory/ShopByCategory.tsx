import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from '../Context';
import productCategoryList from '../../api/productCategory.json';
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
    <section
      className="
        page__section
        categories
        grid__item--tablet-1-12
        grid__item--desktop-1-24"
    >
      <h1 className="page__section-title categories__title">
        Shop by category
      </h1>

      <div
        className="
          categories__content
          grid
          grid--desktop"
        data-cy="categoryLinksContainer"
      >
        {productCategoryList.map(category => (
          <div
            key={category.type}
            className={classNames(
              'categories__item-container',
              { 'grid__item--tablet-1-4': category.type === 'phones' },
              { 'grid__item--desktop-1-8': category.type === 'phones' },
              { 'grid__item--tablet-5-8': category.type === 'tablets' },
              { 'grid__item--desktop-9-16': category.type === 'tablets' },
              { 'grid__item--tablet-9-12': category.type === 'accessories' },
              {
                'grid__item--desktop-17-24':
                category.type === 'accessories',
              },
            )}
          >
            <Link
              key={category.type}
              to={category.url}
              className="categories__item"
            >
              <img
                className={classNames(
                  'categories__image',
                  { 'categories__image--phones': category.type === 'phones' },
                  { 'categories__image--tablets': category.type === 'tablets' },
                  {
                    'categories__image--accessories':
                    category.type === 'accessories',
                  },
                )}
                src={category.image}
                alt={category.title}
              />

              <h3 className="categories__name">
                {category.title}
              </h3>

              <h4 className="categories__count">
                {`${categoryCount(category.type)} models`}
              </h4>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

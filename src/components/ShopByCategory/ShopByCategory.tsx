import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import productCategoryList from '../../api/productCategories.json';
import { useAppSelector } from '../../app/hooks';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const { items } = useAppSelector(state => state.products);

  const phones = useMemo(() => (
    items.filter(product => product.category === 'phones')
  ), [items]);

  const tablets = useMemo(() => (
    items.filter(product => product.category === 'tablets')
  ), [items]);

  const accessories = useMemo(() => (
    items.filter(product => product.category === 'accessories')
  ), [items]);

  const getTotalProducts = (category: string) => {
    switch (category) {
      case 'phones':
        return phones.length;

      case 'tablets':
        return tablets.length;

      case 'accessories':
        return accessories.length;

      default:
        return 0;
    }
  };

  return (
    <section className="
      page__section
      shop-category
      grid__item--desktop-1-24"
    >
      <h1 className="page__section-title">
        Shop by category
      </h1>

      <div
        className="
          shop-category__content
          grid
          grid--desktop"
        data-cy="categoryLinksContainer"
      >
        {productCategoryList.map(category => (
          <motion.div
            key={category.type}
            className={classNames(
              'shop-category__container',
              {
                'grid__item--desktop-1-8': category.type === 'phones',
                'grid__item--desktop-9-16': category.type === 'tablets',
                'grid__item--desktop-17-24': category.type === 'accessories',
              },
            )}
            whileHover={{
              translateX: 10,
              translateY: -20,
              transition: { duration: 0.5 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Link
              key={category.type}
              to={category.url}
              className="shop-category__link"
            >
              <img
                className={classNames(
                  'shop-category__image',
                  {
                    'shop-category__image--phones':
                    category.type === 'phones',
                    'shop-category__image--tablets':
                    category.type === 'tablets',
                    'shop-category__image--accessories':
                    category.type === 'accessories',
                  },
                )}
                src={category.image}
                alt={category.title}
              />

              <h3 className="shop-category__name">
                {category.title}
              </h3>

              <span className="shop-category__products-total">
                {`${getTotalProducts(category.type)} models`}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

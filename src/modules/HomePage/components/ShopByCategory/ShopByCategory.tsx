import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../../../GlobalContext';
import { CATEGORIES } from '../../constants/categories';

import classes from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const { products } = useContext(GlobalContext);

  const getCategoryLength = (category: string) => {
    return products.filter(item => item.category === category).length;
  };

  return (
    <section className={classes.ShopByCategory}>
      <h2 className={classes.ShopByCategory__title}>Shop by category</h2>

      <div className={classes.ShopByCategory__categories}>
        {CATEGORIES.map(item => (
          <Link
            to={`/${item.name}`}
            key={item.name}
            className={classes.ShopByCategory__category}
            data-cy="categoryLinksContainer"
          >
            <div
              className={classes['ShopByCategory__img-container']}
              style={{ backgroundColor: item.background }}
            >
              <picture>
                <source
                  media="(min-width: 640px)"
                  srcSet={`img/${item.src}.png`}
                />
                <img
                  src={`img/${item.src}.webp`}
                  alt={item.name}
                  className={classes.ShopByCategory__img}
                />
              </picture>
            </div>

            <div className={classes.ShopByCategory__details}>
              <h3>{item.title}</h3>
              <p>{`${getCategoryLength(item.name)} models`}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

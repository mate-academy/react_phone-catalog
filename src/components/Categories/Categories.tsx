import classNames from 'classnames';
import style from './Categories.module.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from '../GlobalProvider';

export const Categories = () => {
  const { products } = useContext(StateContext);

  return (
    <div className={classNames(style.container)}>
      <h2 className={classNames(style.title)}>Shop by category</h2>

      <div className={classNames(style.categories_container)}>
        <div className={classNames(style.category_container)}>
          <Link
            to={'/phones'}
            className={classNames(style.category_link)}
          >
            <div className={classNames(style.image, style.image_phones)} />
          </Link>

          <h4 className={classNames(style.categoty_title)}>
            {'Mobile phones'}
          </h4>

          <p className={classNames(style.category_count)}>
            {products.filter(prod => prod.category === 'phones').length} models
          </p>
        </div>
        <div className={classNames(style.category_container)}>
          <Link
            to={'/tablets'}
            className={classNames(style.category_link)}
          >
            <div className={classNames(style.image, style.image_tablet)} />
          </Link>

          <h4 className={classNames(style.categoty_title)}>{'Tablets'}</h4>

          <p className={classNames(style.category_count)}>
            {products.filter(prod => prod.category === 'tablets').length} models
          </p>
        </div>
        <div className={classNames(style.category_container)}>
          <Link
            to={'/accessories'}
            className={classNames(style.category_link)}
          >
            <div className={classNames(style.image, style.image_accessories)} />
          </Link>

          <h4 className={classNames(style.categoty_title)}>{'Accessories'}</h4>

          <p className={classNames(style.category_count)}>
            {
              products.filter(prod => {
                return prod.category === 'accessories';
              }).length
            }{' '}
            models
          </p>
        </div>
      </div>
    </div>
  );
};

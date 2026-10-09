/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import style from './Category.module.scss';
import { useAppSelector } from '../../../../app/hooks';
import classNames from 'classnames';

export const Category = () => {
  const products = useAppSelector(state => state.products.items) || [];

  return (
    <div className={style.category}>
      <p className={'h2'}>Shop by category</p>
      <div className={style.categoryBlock}>
        <Link to="/phones" className={style.categoryLink}>
          <div className={style.categoryItem}>
            <img
              className={style.categoryImg}
              src="img/category-phones.png"
              alt=""
            />
            <p className={classNames(style.itemTitle, 'h4')}>Mobile phones</p>
            <p className={classNames(style.itemText, 'body-text')}>
              {products.filter(item => item.category === 'phones').length}{' '}
              models
            </p>
          </div>
        </Link>
        <Link to="/tablets" className={style.categoryLink}>
          <div className={style.categoryItem}>
            {' '}
            <img
              className={style.categoryImg}
              src="img/category-tablets.png"
              alt=""
            />
            <p className={classNames(style.itemTitle, 'h4')}>Tablets</p>
            <p className={classNames(style.itemText, 'body-text')}>
              {products.filter(item => item.category === 'tablets').length}{' '}
              models
            </p>
          </div>
        </Link>
        <Link to="/accessories" className={style.categoryLink}>
          <div className={style.categoryItem}>
            {' '}
            <img
              className={style.categoryImg}
              src="img/category-accessories.png"
              alt=""
            />
            <p className={classNames(style.itemTitle, 'h4')}>Accessories</p>
            <p className={classNames(style.itemText, 'body-text')}>
              {products.filter(item => item.category === 'accessories').length}{' '}
              models
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

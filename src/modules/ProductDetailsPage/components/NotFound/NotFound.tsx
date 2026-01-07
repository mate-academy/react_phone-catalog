import { Link } from 'react-router-dom';
import style from './NotFound.module.scss';
import back from '../../../../../public/img/my-icon/back.svg';

export const NotFound = () => (
  <div className={style['not-product']}>
    <Link className={style['not-product__link']} to={'..'}>
      <img className={style['not-product__image']} src={back} />
      Back
    </Link>
    <h1 className={style['not-product__title']}>Product not found</h1>
    <div className={style['not-product__img']}></div>
  </div>
);

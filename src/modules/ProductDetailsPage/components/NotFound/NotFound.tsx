import { useNavigate } from 'react-router-dom';
import style from './NotFound.module.scss';
import back from '../../../../../public/img/my-icon/back.svg';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={style['not-product']}>
      <button
        className={style['not-product__button']}
        onClick={() => navigate(-1)}
      >
        <img className={style['not-product__image']} src={back} />
        Back
      </button>
      <h1 className={style['not-product__title']}>Product not found</h1>
      <div className={style['not-product__img']}></div>
    </div>
  );
};

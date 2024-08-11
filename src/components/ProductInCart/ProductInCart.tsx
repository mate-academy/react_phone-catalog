import {
  AiOutlineClose,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import style from './ProductInCart.module.scss';
import test from '../../assets/img/phones/apple-iphone-11/green/00.webp';

export const ProductInCart = () => {
  return (
    <div className={style.product}>
      <div className={style.about}>
        <AiOutlineClose className={style.about__close} size={16} />
        <img src={test} alt="phone" className={style.about__img} />
        <p className={style.about__title}>
          Apple iPhone 14 Pro 128GB Silver (MQ023)
        </p>
      </div>
      <div className={style.actions}>
        <div className={style.actions__buttons}>
          {/* <div className={style.actions__buttons__minus} /> */}
          <AiOutlineMinusCircle size={24} />
          <p className={style.actions__buttons__count}>1</p>
          <AiOutlinePlusCircle size={24} />
          {/* <div className={style.actions__buttons__plus} /> */}
        </div>
        <h3 className={style.actions__price}>$999</h3>
      </div>
    </div>
  );
};

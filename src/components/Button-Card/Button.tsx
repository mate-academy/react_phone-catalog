import style from './button.module.scss';
import favourit from '@Images/icons/like-icons.svg';

export const Button = () => {
  return (
    <>
      <div className={style.container}>
        <button className={style.button}>
          <span className={style.button__text}>Add to cart</span>
        </button>
        <div className={style.favourit}>
          <img className={style.favourit__icon} src={favourit} alt="" />
        </div>
      </div>
    </>
  );
};

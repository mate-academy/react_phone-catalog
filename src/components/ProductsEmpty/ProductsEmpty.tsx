import { Link } from 'react-router-dom';
import img from '../../../public/img/cart-is-empty.png';

import style from './productsEmpty.module.scss';

type Props = {
  title: string;
};

export const ProductsEmpty: React.FC<Props> = ({ title }) => {
  return (
    <>
      <div className={style.wrapper}>
        <h2 className={`title ${style.title}`}>{title} is empty</h2>
        <img className={style.img} src={img} alt="" />
        <div className={style.button}>
          <Link to={'/'} className={style.link}>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

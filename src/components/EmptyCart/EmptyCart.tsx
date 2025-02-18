import { Link } from 'react-router-dom';
import style from './EmptyCart.module.scss';

const EmptyCart = () => {
  return (
    <section className={style.page}>
      <img className={style.img} src="./img/cart-is-empty.png" alt="" />
      <Link to="/" className={style.link}>
        Go to Home Page
      </Link>
    </section>
  );
};

export default EmptyCart;

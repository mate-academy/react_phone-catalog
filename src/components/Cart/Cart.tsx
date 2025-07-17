import { Link } from 'react-router-dom';
import cartStyles from './Cart.module.scss';

const Cart = () => {
  return (
    <>
      <h1>Cart</h1>

      <div className={cartStyles['bag-page__path-of-user']}>
        <Link to="/" className={cartStyles['bag-page__go-home']}></Link>
        <Link
          to="/cart"
          className={cartStyles['bag-page__current-page']}
        ></Link>
        <span>Back</span>
      </div>
    </>
  );
};

export default Cart;

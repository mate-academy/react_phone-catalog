import cart from '../../imgs/Shopping bag (Cart).svg';

import './button.scss';

export const CartButton = () => {
  return (
    <button type="button" className="button button__cart">
      <img src={cart} alt="" />
    </button>
  );
};

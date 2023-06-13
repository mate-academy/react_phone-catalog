import './cart.scss';
import Cros from '../../images/icons/close.png';
import SmallImg1 from '../../images/productDetails/imageSmall_1.png';
import SmallImg3 from '../../images/productDetails/imageSmall_3.png';
import Minus from '../../images/icons/minus.png';
import Plus from '../../images/icons/plus.png';

export const CartPage = () => {
  return (
    <div className="cart">
      <h1 className="cart__title">Cart</h1>
      <div className="grid">
        <div className="cart__productCards grid__item--desktop-1-16 grid__item--tablet-1-12">
          <div className="cart__productCards__card">
            <div className="cart__productCards__card__cross">
              <img src={Cros} alt="" className="cart__productCards__card__crossImg" />
            </div>

            <div className="cart__productCards__card__imgContainer">
              <img src={SmallImg1} alt="" className="cart__productCards__card__img" />
            </div>

            <p className="cart__productCards__card__name">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>

            <div className="cart__productCards__card__btnContainer">
              <div className="cart__productCards__card__btnContainer__btn">
                <img src={Minus} alt="" />
              </div>
              <p className="cart__productCards__card__btnContainer__number">1</p>
              <div className="cart__productCards__card__btnContainer__btn">
                <img src={Plus} alt="" />
              </div>
            </div>

            <h2 className="cart__productCards__card__price">$1099</h2>

          </div>

          <div className="cart__productCards__card">
            <div className="cart__productCards__card__cross">
              <img src={Cros} alt="" className="cart__productCards__card__crossImg" />
            </div>

            <div className="cart__productCards__card__imgContainer">
              <img src={SmallImg3} alt="" className="cart__productCards__card__img" />
            </div>

            <p className="cart__productCards__card__name">Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>

            <div className="cart__productCards__card__btnContainer">
              <div className="cart__productCards__card__btnContainer__btn">
                <img src={Minus} alt="" />
              </div>
              <p className="cart__productCards__card__btnContainer__number">1</p>
              <div className="cart__productCards__card__btnContainer__btn">
                <img src={Plus} alt="" />
              </div>
            </div>

            <h2 className="cart__productCards__card__price">$1099</h2>

          </div>
        </div>

        <div className="cart__priceContainer grid__item--desktop-17-24 grid__item--tablet-1-12">
          <h1 className="cart__priceContainer__totalPrice">$3297</h1>
          <p className="cart__priceContainer__info">Total for 3 items</p>

          <button className="cart__priceContainer__btn">
            Checkout
          </button>
        </div>
      </div>

    </div>
  );
};

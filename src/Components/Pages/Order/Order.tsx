import { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonBack } from '../../Parts/ButtonBack/ButtonBack';
import { ProductInCart } from '../../../types/ProductInCart';
import { useAppContext } from '../../../context/AppContext';

import './Order.scss';

type Props = {
  products: ProductInCart[];
};

export const Order: FC<Props> = ({ products }) => {
  const totalSum = products.reduce(
    (acc: number, el: ProductInCart) => acc + el.price * el.count,
    0,
  );
  const { inCartCount } = useAppContext();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [firstStatement, setFirstStatement] = useState(false);
  const [secondStatement, setSecondStatement] = useState(false);
  const [end, setEnd] = useState(false);

  const valid =
    name.length < 4 ||
    lastName.length < 4 ||
    !email.includes('@') ||
    number.length < 7 ||
    !firstStatement ||
    !secondStatement;

  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');

  const handlerNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);
  };

  const handlerLastNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setLastName(ev.target.value);
  };

  const handlerEmailChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  };

  const handlerNumberChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNumber(ev.target.value);
  };

  const handleFirstStatement = () => setFirstStatement(!firstStatement);
  const handleSecondStatement = () => setSecondStatement(!secondStatement);

  const handleEnd = () => setEnd(true);

  if (inCartCount === 0) {
    return (
      <>
        <h2 className="cart__not-res">
          Cart&apos;s feeling empty.
          <br />
          Shop now for awesome deals and fill up your cart with tech goodness!
        </h2>
      </>
    );
  }

  if (end) {
    return (
      <div className="order">
        <div className="order__suprise">
          <div className="order__title">
            Hi
            {` ${name} ${lastName}`}! Thank you for testing, you have been
            absolutely awesome! Thanks for your superpowers and super positive
            vibes during testing!
          </div>
          <button
            className="order__button button"
            type="button"
            onClick={handleNavigate}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order">
      <div className="order__container">
        <div className="order__navigate">
          <ButtonBack />
        </div>

        <h2 className="cart__title title">Place Order</h2>
        <div className="order__content">
          <form action="" className="order__form">
            <fieldset className="order__fieldset">
              <div className="order__fieldset-title">
                <span className="order__fieldset-number">1</span>
                <div className="order__fieldset-legend">
                  Personal Information
                </div>
              </div>
              <div className="order__fieldset-inputs">
                <label
                  htmlFor="firstName"
                  className="order__label order__label-mg"
                >
                  First Name
                  <input
                    type="text"
                    placeholder="Enter first name"
                    id="firstName"
                    className="order__input"
                    min={4}
                    value={name}
                    onChange={handlerNameChange}
                    required
                  />
                </label>

                <label
                  htmlFor="firstName"
                  className="order__label order__label-mg"
                >
                  Last Name
                  <input
                    type="text"
                    placeholder="Enter last name"
                    id="lastName"
                    min={4}
                    className="order__input"
                    value={lastName}
                    onChange={handlerLastNameChange}
                    required
                  />
                </label>

                <label htmlFor="email" className="order__label order__label-mg">
                  Email Address
                  <input
                    type="email"
                    placeholder="Enter email address"
                    id="email"
                    className="order__input"
                    value={email}
                    onChange={handlerEmailChange}
                    required
                  />
                </label>

                <label
                  htmlFor="number"
                  className="order__label order__label-mg"
                >
                  Phone Number
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    id="number"
                    value={number}
                    onChange={handlerNumberChange}
                    className="order__input"
                    required
                  />
                </label>
              </div>
            </fieldset>
            <fieldset className="order__fieldset">
              <div className="order__fieldset-title">
                <span className="order__fieldset-number">2</span>
                <div className="order__fieldset-legend">Pick-up point</div>
              </div>
              <div className="order__fieldset-inputs">
                <div className="order__fieldset-sText">
                  <h2 className="order__fieldset-sText-p">
                    Select a store to pick up your order
                    <span className="order__fieldset-sText-free">Free</span>
                  </h2>
                  <div className="order__fieldset-sText-geo">
                    <img
                      src="./img/svg/Geo.svg"
                      alt="Geo Mark"
                      className="order__fieldset-geo"
                    />
                    <p className="order__fieldset-sText-small-p">
                      Kyiv, Kyiv oblast
                    </p>
                  </div>
                </div>

                <select
                  name="store"
                  id="store"
                  className="order__fieldset-select"
                >
                  <option value="st1" className="order__fieldset-select-0">
                    Khreshchatyk St., 11
                  </option>
                  <option value="st2" className="order__fieldset-select-0">
                    Polkova St., 61
                  </option>
                  <option value="st3" className="order__fieldset-select-0">
                    Chornomorska St., 1
                  </option>
                </select>
              </div>
            </fieldset>
            <fieldset className="order__fieldset">
              <div className="order__fieldset-title">
                <span className="order__fieldset-number">3</span>
                <div className="order__fieldset-legend">Payment Details</div>
              </div>
              <h2 className="order__fieldset-sText-p">
                Please accept the following statements:
              </h2>

              <div className="order__statements">
                <div className="order__checkbox">
                  <input
                    type="checkbox"
                    id="check1"
                    name="check"
                    className="order__check"
                    onClick={handleFirstStatement}
                    required
                  />
                  <label
                    htmlFor="check1"
                    className="order__fieldset-sText-small-p"
                  >
                    By placing an order, I acknowledge that I am responsible for
                    inspecting the goods upon receipt, and I agree to make
                    payment only after confirming their completeness according
                    to the agreed-upon standards. The inspection must be
                    completed on the day of receipt.If any issues are not
                    reported on the day of receipt, it will be assumed that the
                    goods are satisfactory, and payment will be expected
                    accordingly.
                  </label>
                </div>

                <div className="order__checkbox">
                  <input
                    type="checkbox"
                    id="check1"
                    name="check"
                    className="order__checkbox"
                    onClick={handleSecondStatement}
                    required
                  />
                  <label
                    htmlFor="check1"
                    className="order__fieldset-sText-small-p"
                  >
                    I acknowledge and accept the{' '}
                    <span className="order__link-des">Terms of Conditions</span>
                    , including the{' '}
                    <span className="order__link-des">
                      Provisions on Personal Data Processing.
                    </span>
                  </label>
                </div>
              </div>
            </fieldset>
          </form>
          <div className="cart__total-box">
            <h2 className="order__total-box-title">Order Summary</h2>
            <div className="order__items">
              {products.map(product => (
                <div className="order__total-item" key={product.id}>
                  <p className="order__total-item-name">{product.name}</p>
                  <p className="order__total-item-price">
                    {`$${product.price}`}
                  </p>
                </div>
              ))}
            </div>
            <div className="order__info">
              <h2 className="order__total">Total</h2>
              <h2 className="order__total-price">{`$${totalSum}`}</h2>
            </div>

            <button
              type="button"
              className="order__button button"
              disabled={valid}
              onClick={handleEnd}
            >
              Confirm Order
            </button>
            <p className="order__fieldset-sText-small-p">
              We`ll email your{' '}
              <span className="order__link-des">Terms of Conditions</span>
              and{' '}
              <span className="order__link-des">
                Provisions on Personal Data Processing
              </span>{' '}
              and payment receipt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

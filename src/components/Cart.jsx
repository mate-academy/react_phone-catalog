import React from 'react'
import { Link } from 'react-router-dom';

const Cart = ({ selectedPhone, deletePhone, changeAmountPlus, changeAmountMinus }) => (
  <div>
    <div className="cart-phones">
      <Link
        className="cart-phones_link-back"
        to='/phones'
      >Go back to catalog
      </Link>
      <p className="cart-phone_sign">
        There are {selectedPhone.length} {selectedPhone.length >= 2 ? 'phones' : 'phone'} in your cart
      </p>
    </div>
      {selectedPhone.map(phone => (
          <>
            <section className="cart-phone_table">
              <Link
                  className="catalog_phone-text-decoration"
                  to={`/phones/${phone.id}`}
              >
                <img
                  src={phone.image}
                  alt=''
                  className="cart-phone_table-img"
                />
                <p className="cart-phone_table-name">{phone.name}</p>
              </Link>
              <div className="cart-phone_table-grid">
                <button
                  className="cart-phone_table-amount-btn"
                  onClick={() => changeAmountPlus(phone.id)}
                >+
                </button>
                <p className="cart-phone_table-amount-sign">Amount: {phone.amount}</p>
                <button
                  className="cart-phone_table-amount-btn"
                  onClick={() => changeAmountMinus(phone.id)}
                >-
                </button>
                <div>
                  <button
                    className="cart-phone_table-remove-btn"
                    onClick={() => deletePhone(phone.id)}
                  >Remove from cart
                  </button>
                </div>
              </div>
            </section>
          </>
        ))}
  </div>
)

export default Cart

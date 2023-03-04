import './Checkout.scss';
import React, { useState } from 'react';
import { Input } from '../../../common/Input/Input';

interface CheckoutPageState {
  name: string;
  email: string;
  address: string;
  cardNumber: string;
  cardExpiration: string;
  cardCVV: string;
}

export const Checkout = () => {
  const [isResponse, setIsResponse] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutPageState>({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    cardExpiration: '',
    cardCVV: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setCheckoutForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsResponse(true);
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="checkout__form-block">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            name="name"
            id="name"
            value={checkoutForm.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="checkout__form-block">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            name="email"
            id="email"
            value={checkoutForm.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="checkout__form-block">
          <label htmlFor="address">Address</label>
          <Input
            type="text"
            name="address"
            id="address"
            value={checkoutForm.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="checkout__form-block">
          <label htmlFor="cardNumber">Card Number</label>
          <Input
            type="text"
            name="cardNumber"
            id="cardNumber"
            value={checkoutForm.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="checkout__form-block">
          <label htmlFor="cardExpiration">Expiration Date</label>
          <Input
            type="text"
            name="cardExpiration"
            id="cardExpiration"
            value={checkoutForm.cardExpiration}
            onChange={handleInputChange}
          />
        </div>
        <div className="checkout__form-block">
          <label htmlFor="cardCVV">CVV</label>
          <Input
            type="text"
            name="cardCVV"
            id="cardCVV"
            value={checkoutForm.cardCVV}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="long-button__link body14"
          type="submit"
        >
          Order
        </button>
      </form>
      {isResponse && <div className="payment-success">Successfull payment</div>}
    </div>
  );
};

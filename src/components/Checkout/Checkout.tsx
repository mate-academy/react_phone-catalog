import React from 'react';
import { Link } from 'react-router-dom';
import './Checkout.scss';

const Checkout = () => (
  <div className="IntermediatePage">
    <h1 className="IntermediatePage__Title">
      Thank you for purchase
    </h1>
    <div className="IntermediatePage__Btn">
      <Link
        to="/phones"
        className="IntermediatePage__Link"
      >
        {' '}
        Go to shop
      </Link>

    </div>
  </div>

);

export default Checkout;

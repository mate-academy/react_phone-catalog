import React from 'react';
import { useAppSelector } from '../../store/redux/hooks';
import { cartSelector } from '../../store/redux/slices/cartSlice';
import { Link, Navigate } from 'react-router-dom';
import { PAGE } from '../../definitions/enums/Router';

import './CheckoutPage.scss';

export const CheckoutPage: React.FC = () => {
  const cartIsEmpty = useAppSelector(cartSelector.selectEmptyList);

  if (cartIsEmpty) {
    return <Navigate to={`/${PAGE.Cart}`} replace />
  }

  return (
    <div className='checkout-page'>
      <p className="checkout-page__main-description">
        {'This site was created by '}
        <a href="https://github.com/Softjey" target='_blank'>
          Sviatoslav Mysiv
        </a>
        {' as a practice project.'}
      </p>

      <p className='checkout-page__description'>
        While it simulates an online store, it's designed to demonstrate web development skills rather than to sell products. The design was implemented based on external concepts, showcasing the ability to bring design ideas to life.
      </p>


      <a
        href="https://github.com/Softjey/react_phone-catalog"
        target="_blank" rel="noopener noreferrer" className="checkout-page__link"
      >
        Visit GitHub
      </a>

      <Link
        to={`${PAGE.Home}`}
        className="checkout-page__link"
      >
        Go to home page
      </Link>
    </div>
  );
};

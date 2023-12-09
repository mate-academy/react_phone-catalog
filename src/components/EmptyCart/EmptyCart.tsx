import './EmptyCart.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

export const EmptyCart: React.FC = () => (
  <div className="empty">
    <div className="empty__svg-container">
      <ReactSVG
        src="img/icons/shopping-bag.svg"
      />
    </div>
    <h1>No items yet?</h1>
    <p>Continue shopping to explore more.</p>
    <Link
      to=".."
      className="empty__link"
    >
      Go shopping
    </Link>
  </div>
);

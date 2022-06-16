import React from 'react';
import { ReactComponent as Arrow } from '../../images/small-arrow.svg';

import './backToTop.scss';

export const BackToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={() => scrollToTop()}
    >
      <span>Back to top</span>
      <div className="back-to-top__arrow">
        <Arrow />
      </div>
    </button>
  );
};

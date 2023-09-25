import React from 'react';

import { ReactComponent as ArrowUp } from '../../images/icons/arrow_up.svg';

export const GoTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    scrollToTop();
  };

  return (
    <a
      className="go-top"
      href="#/"
      onClick={handleLinkClick}
    >
      <div className="go-top__link">
        Back to top
      </div>
      <div className="go-top__icon">
        <ArrowUp />
      </div>
    </a>
  );
};

import { FC } from 'react';
import { Button } from '../Button/Button';

import './BackToTopButton.scss';

export const BackToTopButton: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="back-to-top">
      <span className="back-to-top__text">
        Back to top
      </span>

      <Button
        className="back-to-top"
        iconType="arrow-up"
        onClick={scrollToTop}
      />
    </div>
  );
};

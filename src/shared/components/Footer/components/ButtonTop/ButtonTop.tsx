import { ArrowIcon } from '@/shared/assets/icons';
import { IconButton } from '@/shared/components/Buttons/components/IconButton';

import './ButtonTop.scss';

export const ButtonTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="back-to-top">
      <span className="back-to-top__text">Back to top</span>
      <IconButton
        className="back-to-top__button"
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <ArrowIcon className="back-to-top__icon" />
      </IconButton>
    </div>
  );
};

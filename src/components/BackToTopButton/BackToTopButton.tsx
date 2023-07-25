import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import './BackToTopButton.scss';

export const BackToTopButton = () => {
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Link
      to={location.pathname}
      className="top-button"
      onClick={handleScrollToTop}
    >
      <p className="top-button__text">
        Back to top
      </p>

      <Icon
        type={IconType.ARROW_UP}
        addClassName="top-button__icon"
      />
    </Link>
  );
};

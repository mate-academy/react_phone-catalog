import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import { scrollToTop } from '../../utils/scrollToTop';
import './BackToTopButton.scss';

export const BackToTopButton = () => {
  const location = useLocation();

  return (
    <Link
      to={location.pathname}
      className="top-button"
      onClick={scrollToTop}
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

import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import './ToTopButton.scss';

export const ToTopButton: React.FC = () => {
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
      className="footer__button-top button-top"
      to={`${location.pathname}`}
      type="button"
      onClick={handleScrollToTop}
    >
      <p className="button-top__text">
        Back to top
      </p>

      <Icon
        type={IconType.ARROW_UP}
        addClassName="button-top__icon"
      />
    </Link>
  );
};

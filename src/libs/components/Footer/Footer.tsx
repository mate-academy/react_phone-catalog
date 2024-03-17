/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { FOOTER_LINKS } from '../../constants';

import { Logo } from '../Logo';
import { Icon } from '../Icon/Icon';

import './Footer.scss';

type Props = {
  classNames: string
};

export const Footer: React.FC<Props> = ({
  classNames,
}) => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={cn('footer', classNames)}>
      <Logo classNames="footer__logo" />
      <ul className="footer__list">
        {Object.entries(FOOTER_LINKS).map(([key, value]) => (
          <li
            className="footer__item"
            key={key}
          >
            <Link
              to={key === 'Contacts' ? `mailto:${value}` : value}
              className="footer__link"
              target="_blank"
            >
              {key.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
      <div className="footer__back-to-top back-to-top">
        <span className="back-to-top__text">Back to top</span>
        <button
          type="button"
          className="back-to-top__button"
          onClick={handleBackToTop}
        >
          <Icon iconName="arrowUp" classNames="back-to-top__icon" />
        </button>
      </div>
    </footer>
  );
};

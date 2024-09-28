import { setScrollToTop } from '../../features/scroll/scrollSlice';
import { useAppDispatch } from '../../hooks';

import { Logo } from '../Logo';

import styles from './Footer.module.scss';
const {
  footer,
  footer__content,
  footer__logo,
  footer__nav,
  footer__anchor,
  footer__anchor__text,
  footer__anchor__link,
  footer__anchor__icon,
  footer__link,
} = styles;

export const Footer = () => {
  const dispatch = useAppDispatch();

  const handleAnchorClick = () => {
    dispatch(setScrollToTop('smooth'));
  };

  return (
    <footer className={footer}>
      <div className={footer__content}>
        <div className={footer__logo}>
          <Logo placement="footer" />
        </div>

        <nav className={footer__nav}>
          <a
            href="https://github.com/mykhailonl"
            rel="noopener noreferrer"
            target="_blank"
            className={footer__link}
          >
            Github
          </a>

          <a
            href="https://linkedin.com/in/mykhailo-lapchynskyi-003251322"
            rel="noopener noreferrer"
            target="_blank"
            className={footer__link}
          >
            Contacts
          </a>

          <a
            href="https://github.com/mykhailonl"
            rel="noopener noreferrer"
            target="_blank"
            className={footer__link}
          >
            Rights
          </a>
        </nav>

        <div className={footer__anchor} onClick={handleAnchorClick}>
          <small className={footer__anchor__text}>Back to top</small>

          <button className={footer__anchor__link}>
            <div className={footer__anchor__icon} />
          </button>
        </div>
      </div>
    </footer>
  );
};

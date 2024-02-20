import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../../types/Icons';
import { ButtonSquare } from '../ButtonSquare/ButtonSquare';
import { Container } from '../Container/Container';
import { Logo } from '../Logo/Logo';
import './Footer.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { pathname } = useLocation();

  const isBackToTopBtnHidden = pathname === '/cart';

  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <Logo />

          <ul className="footer__list">
            <li className="footer__item">
              <a
                href="https://github.com/AnastasiiaEm"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Github
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://github.com/AnastasiiaEm"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Contacts
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://github.com/AnastasiiaEm"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Rights
              </a>
            </li>
          </ul>

          <div
            className={classNames('footer__back-to-top', {
              'footer__back-to-top--hidden': isBackToTopBtnHidden,
            })}
          >
            <span className="footer__back-to-top-text">Back to top</span>
            <ButtonSquare
              icon={Icon.ArrowUp}
              onAction={scrollToTop}
            />
          </div>

        </div>
      </Container>
    </footer>
  );
};

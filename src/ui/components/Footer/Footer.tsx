import { Link } from 'react-router-dom';
import { Icon, Button, Typography } from '../../base';
import { Logo } from '../Logo';
import { useScrollToTop } from '../../../hooks';

import './Footer.scss';

export const Footer: React.FC = () => {
  const [backToTop] = useScrollToTop();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/">
            <Logo />
          </Link>

          <ul className="footer__list">
            <li className="footer__item">
              <Link
                to="https://github.com/vintwp"
                className="footer__link"
                target="_blank"
              >
                <Typography
                  type="text"
                  size="sm"
                  weight="700"
                  className="footer__link"
                  textTransform="uppercase"
                >
                  Github
                </Typography>
              </Link>
            </li>
            <li className="footer__item">
              <Link to="contacts" className="footer__link">
                <Typography
                  type="text"
                  size="sm"
                  weight="700"
                  className="footer__link"
                  textTransform="uppercase"
                >
                  Contacts
                </Typography>
              </Link>
            </li>
            <li className="footer__item">
              <Link to="right" className="footer__link">
                <Typography
                  type="text"
                  size="sm"
                  weight="700"
                  className="footer__link"
                  textTransform="uppercase"
                >
                  Rights
                </Typography>
              </Link>
            </li>
          </ul>
          <Button
            type="default"
            className="footer__button"
            onClickHandler={backToTop}
          >
            <Typography
              type="text"
              size="sm"
              weight="600"
              className="footer__button-label"
            >
              Back to the top
            </Typography>
            <Icon
              id="arrow-right"
              width={16}
              height={16}
              className="arrow__icon"
            />
          </Button>
        </div>
      </div>
    </footer>
  );
};

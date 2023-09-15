import { Link } from 'react-router-dom';
import './Footer.scss';
import { FooterNavigation } from '../FooterNavigation';
import { IconButton } from '../../bits';
import { Wrapper } from '../Wrapper';
import { IconButtonType } from '../../types/enums/IconButtonType';
import { AppRoutes } from '../../config';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <Wrapper>
        <div className="footer__content">
          <Link
            className="footer__logo"
            to={AppRoutes.HomePage}
          >
            <img alt="logo" src="./img/icons/logo.svg" />
          </Link>

          <FooterNavigation />

          <div className="footer__button-box">
            <span className="footer__button-title">back to top</span>
            <IconButton
              type={IconButtonType.arrowUp}
              handler={handleBackToTop}
            />
          </div>
        </div>

      </Wrapper>
    </footer>
  );
};

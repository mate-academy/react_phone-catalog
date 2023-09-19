import { Link } from 'react-router-dom';
import { Wrapper } from 'components/Wrapper';
import { FooterNavigation } from 'components/FooterNavigation';
import { AppRoutes } from 'config';
import { IconButtonType } from 'types';
import { IconButton } from 'components/ui-kit';
import './Footer.scss';

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
              onClickHandler={handleBackToTop}
            />
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

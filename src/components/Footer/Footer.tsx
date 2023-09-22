import { Wrapper, FooterNavigation, Logo } from 'components';
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
          <div className="footer__logo">
            <Logo />
          </div>

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

import { Link } from 'react-router-dom';
import './Footer.scss';
import { FooterNavigation } from '../FooterNavigation';
import { IconButton } from '../../bits';
import { Wrapper } from '../Wrapper';
import { IconButtonType } from '../../types/enums/IconButtonType';

export const Footer = () => {
  return (
    <footer className="footer">
      <Wrapper>
        <div className="footer__content">
          <Link
            className="footer__logo"
            to="/"
          >
            <img alt="logo" src="./img/icons/logo.svg" />
          </Link>

          <FooterNavigation />

          <div className="footer__button-box">
            <span className="footer__button-title">back to top</span>
            <IconButton type={IconButtonType.arrowUp} />
          </div>
        </div>

      </Wrapper>

    </footer>
  );
};

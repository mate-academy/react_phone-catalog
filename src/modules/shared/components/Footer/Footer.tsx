import React from 'react';
import { FooterItems } from './components/FooterItems';
import { MainLogo } from '../MainLogo';
import './Footer.scss';
import { IconButton } from '../Buttons/IconButton';
import { useLanguage } from '../../../../context/LanguageContext';

type Props = {
  className: string;
};

export const Footer: React.FC<Props> = ({ className }) => {
  const { texts } = useLanguage();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <footer className={`footer ${className}`}>
      <MainLogo className="footer__logo" />
      <FooterItems className="footer__footerItems" />
      <div className="footer__button-to-top">
        <p className="footer__text">{texts.backToTop}</p>
        <IconButton
          name="arrow-up"
          onClick={handleClick}
          className="footer__button"
        />
      </div>
    </footer>
  );
};

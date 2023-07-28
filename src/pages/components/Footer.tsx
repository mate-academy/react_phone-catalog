import { FC } from 'react';
import '../../styles/styles.scss';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <a href="http://" className="footer__link">
        <img src="images/LOGO.PNG" alt="Logo" />
      </a>
      <div className="footer__container">
        <a href="http://" className="footer__link">Github</a>
        <a href="http://" className="footer__link">Contacts</a>
        <a href="http://" className="footer__link">rights</a>
      </div>
      <button className="footer__backtotop-button" type="button">
        <img src="images/icons/ArrowUp.svg" alt="Back to top" />
      </button>
    </footer>
  );
};

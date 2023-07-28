import React from 'react';
import { PageNavLink } from '../../helpers/PageNavLink';
import './footer.scss';

export const Footer: React.FC = () => {
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__logo" />
        <div className="nav">
          <PageNavLink text="GITHUB" to="https://github.com/Anastasiya145/" />
          <PageNavLink text="CONTACTS" to="tel:+330784070315" />
          <PageNavLink text="RIGHTS" to="https://github.com/Anastasiya145/" />
        </div>
        {/* eslint-disable-next-line */}
        <button
          className="button button_scroll"
          type="button"
          onClick={() => scrollToElement('header')}
        />
      </div>
    </div>
  );
};

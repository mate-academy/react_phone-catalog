import React from 'react';
import './footer.scss';
import {
  ARROW_UP,
  OWNER_GIT_HUB,
} from '../Additionals/additional_api';

export const Footer = () => {
  return (
    <footer className="Footer">
      <img className="Nav__logo" alt="logo" src="/src/Additionals/icons/logo.svg" />
      <ul className="Nav__list">
        <li className="Nav__list_item">
          <a className="Footer__link" href={OWNER_GIT_HUB}>GITHUB</a>
        </li>
        <li className="Nav__list_item">
          <a className="Footer__link" href="/">CONTACTS</a>
        </li>
        <li className="Nav__list_item">
          <a className="Footer__link" href="/">RIGHTS</a>
        </li>
      </ul>
      <div className="Footer__mover">
        <span className="Footer__mover_title">Back to top</span>
        <img className="Footer__mover_img" alt="back to top" src={ARROW_UP} />
      </div>
    </footer>
  );
};

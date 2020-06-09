import React from 'react';
import './footer.scss';
import {
  OWNER_GIT_HUB,
} from '../Additional/additional_api';

export const Footer = () => {

  const smoothScroll = () => (
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  )

  return (
    <footer className="Footer">
      <img className="Nav__logo" alt="logo" src="img/icons/logo.svg"/>
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
      <div className="Footer__mover" onClick={smoothScroll}>
        <span className="Footer__mover_title">Back to top</span>
        <img className="Footer__mover_img" alt="back to top" src="img/icons/arrow.svg"/>
      </div>
    </footer>
  );
};

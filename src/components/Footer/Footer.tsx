import classNames from 'classnames';

import style from './Footer.module.scss';
import { FooterLinks } from './FooterLinks';
import { SiteLogo } from '../SiteLogo';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={classNames(style.footer_container)}>
      <div className={classNames(style.footer_container_logo)}>
        <SiteLogo />
      </div>

      <div className={classNames(style.footer_container_links)}>
        <FooterLinks />
      </div>

      <div className={classNames(style.footer_container_back_top)}>
        <div
          className={classNames(style.back_top_text)}
          onClick={() => scrollToTop()}
        >
          Back to top
        </div>

        <div
          className={classNames(
            style.icon_container,
            style.icon_container_upArrow,
          )}
          onClick={() => scrollToTop()}
        >
          <div className={classNames(style.icon, style.icon_upArrow)} />
        </div>
      </div>
    </div>
  );
};

import classNames from 'classnames';

import style from './Footer.module.scss';
import { FooterLinks } from './FooterLinks';
import { SiteLogo } from '../SiteLogo';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={classNames(style.container)}>
      <div className={classNames(style.container_logo)}>
        <SiteLogo />
      </div>

      <div className={classNames(style.container_links)}>
        <FooterLinks />
      </div>

      <div className={classNames(style.container_back_top)}>
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
        >
          <div
            className={classNames(style.icon, style.icon_upArrow)}
            onClick={() => scrollToTop()}
          />
        </div>
      </div>
    </div>
  );
};

import { memo } from 'react';
import { Container } from '../../../shared/ui/Container';
import { MainLogo } from '../../MainLogo';
import { Button, ButtonTheme } from '../../../shared/ui/Button';
import { IFooterItem } from '../model/types/footer';
import classNames from 'classnames';
import cls from './footer.module.scss';
import icons from '../../../shared/styles/icons.module.scss';

const footerMenuItems: IFooterItem[] = [
  { text: 'github', link: '/' },
  { text: 'contacts', link: '/' },
  { text: 'rights', link: '/' },
];

export const Footer = memo(() => {
  return (
    <footer className={cls.footer}>
      <Container>
        <div className={cls.footer__body}>
          <MainLogo />

          <div className={classNames(cls.footer__menu, cls.menu)}>
            <nav className={cls.menu__body}>
              <ul className={cls.menu__list}>
                {footerMenuItems.map(({ link, text }) => (
                  <li key={text} className={cls.menu__item}>
                    <a href={link} className={cls.menu__link}>
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={cls['footer__back-btn']}>
            <span className={cls['footer__back-text']}>Back to top</span>
            <Button
              theme={ButtonTheme.SQUARE}
              className={classNames(
                cls['footer__back-arrow'],
                icons['_icon-arrow'],
              )}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
});

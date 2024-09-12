/* eslint-disable react/jsx-key */
import { memo } from 'react';
import { Container } from '../../../shared/ui/Container';
import { MainLogo } from '../../MainLogo';
import classNames from 'classnames';
import cls from './footer.module.scss';
import icons from '../../../shared/styles/icons.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/forms';

export const Footer = memo(() => {
  return (
    <footer className={cls.footer}>
      <Container>
        <div className={cls.footer__body}>
          <MainLogo />

          <div className={classNames(cls.footer__menu, cls.menu)}>
            <nav className={cls.menu__body}>
              <ul className={cls.menu__list}>
                <li className={cls.menu__item}>
                  <a
                    href={'https://github.com/Oleksii-Bidiak'}
                    rel="noreferrer"
                    target="_blank"
                    className={cls.menu__link}
                  >
                    {'github'}
                  </a>
                </li>
                <li className={cls.menu__item}>
                  <a
                    href={'https://github.com/Oleksii-Bidiak'}
                    rel="noreferrer"
                    target="_blank"
                    className={cls.menu__link}
                  >
                    {'contacts'}
                  </a>
                </li>
                <li className={cls.menu__item}>
                  <a
                    href={'https://github.com/Oleksii-Bidiak'}
                    rel="noreferrer"
                    target="_blank"
                    className={cls.menu__link}
                  >
                    {'rights'}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={cls['footer__back-btn']}
          >
            <span className={cls['footer__back-text']}>Back to top</span>
            <Button
              theme={ButtonTheme.SQUARE}
              className={classNames(
                cls['footer__back-arrow'],
                icons['_icon-arrow'],
              )}
            />
          </button>
        </div>
      </Container>
    </footer>
  );
});

/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { scrollToTop } from '../../../utils/scrollToTop';
import { SecondaryButton } from '../../shared/Shared_Components/ActionButtons/SecondaryButton/SecondaryButton';
import { DarkModeContext } from '../../../Store/StoreThemeMode';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { isDark } = useContext(DarkModeContext);

  return (
    <AnimatedLayout>
      <footer
        className={classNames('footer', {
          'footer--is-Dark': isDark,
        })}
      >
        <Link
          className={classNames('footer__logo', {
            'footer__logo--is-Dark': isDark,
          })}
          to={'/'}
        />

        <div
          className={classNames('footer__links', {
            'footer__links--is-Dark': isDark,
          })}
        >
          <Link
            className="footer__link"
            target="_blank"
            to="https://github.com/DenLysiak"
          >
            github
          </Link>

          <Link className="footer__link" to="">
            contacts
          </Link>

          <Link className="footer__link" to="">
            rights
          </Link>
        </div>

        <div className="footer__end">
          <p className="footer__text">Back to top</p>

          <SecondaryButton isDark={isDark} isTop onClickHandler={scrollToTop} />
        </div>
      </footer>
    </AnimatedLayout>
  );
};

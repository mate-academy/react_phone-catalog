/* eslint-disable import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../shared/context/ThemeContext';
import style from './Footer.module.scss';

export const Footer = () => {
  const navigation = ['github', 'contacts', 'rights'];
  const { t } = useTranslation();
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { theme } = useTheme();

  return (
    <div className={style.footer}>
      <div className={style.logo}>
        <img
          className={style.logo__image}
          src={
            theme === 'light' ? './logo/Logo.svg' : './logo/Logo-dark-theme.svg'
          }
        />
      </div>
      <div className={style.navigation}>
        <ul className={style.navigation__list}>
          {navigation.map(item => (
            <li key={item}>
              <a
                href={
                  item === 'github'
                    ? 'https://github.com/yzhyhaliuk/react_phone-catalog'
                    : '/'
                }
                target={item === 'github' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={style.navigation__link}
              >
                {t(`footer.${item}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.return}>
        <span className={style.return__words}>{t('backToTop')}</span>
        <button className={style.return__arrow} onClick={scrollUp}>
          <img
            src={
              theme === 'light'
                ? './icons/arrow-up.svg'
                : './icons/arrow-up-dark-theme.svg'
            }
            alt="Up"
          />
        </button>
      </div>
    </div>
  );
};

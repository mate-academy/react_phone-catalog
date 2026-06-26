import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Icon from '../shared/Icon';
import { SelectOption } from '../../types/SelectOptions';
import { siteLanguages } from '../constants';
import Select from '../shared/Select';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from '../shared/Logo';

export const Footer = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<SelectOption>({
    value: i18n.language,
    label:
      siteLanguages[i18n.language as keyof typeof siteLanguages] ||
      i18n.language,
  });

  const selectLanguage = (selectedOption: SelectOption | null) => {
    let newOption = selectedOption;

    if (!newOption) {
      newOption = {
        value: i18n.language,
        label:
          siteLanguages[i18n.language as keyof typeof siteLanguages] ||
          i18n.language,
      };
    }

    setLanguage(newOption);
    i18n.changeLanguage(newOption.value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const langOptions: SelectOption[] = Object.entries(siteLanguages).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <div className={styles.footer__left}>
            <NavLink className={styles.footer__logo} to="/">
              <Logo />
            </NavLink>
          </div>
          <div className={styles.footer__menu}>
            <Link className={styles.footer__link} to="#">
              Github
            </Link>
            <Link className={styles.footer__link} to="#">
              Contacts
            </Link>
            <Link className={styles.footer__link} to="#">
              Rights
            </Link>
            <Select
              value={language}
              options={langOptions}
              onChange={selectLanguage}
              menuPlacementTop
            />
            <ThemeSwitcher />
          </div>
          <div className={styles.footer__right}>
            <a>Back to top</a>
            <Icon
              onClick={scrollToTop}
              iconStyles={{
                icon: 'type_slider',
                image: ['arrowRight', 'rotate_90'],
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

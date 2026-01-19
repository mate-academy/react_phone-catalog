import classNames from 'classnames';
import styles from './Footer.module.scss';
import { Logo } from '../../elements/Logo';
import { scrollTop } from '../../services/layouts';
import { NavigationAction } from '../../elements/NavigationAction';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.footer__content, 'container')}>
        <Logo size="bg" />
        <nav className={styles.footer__navigation}>
          <NavigationAction
            as="externalLink"
            type="text"
            to="https://github.com/ArtemYakhno/react_phone-catalog"
          >
            GITHUB
          </NavigationAction>
          <NavigationAction as="link" type="text" to="/contacts">
            {t('contacts')}
          </NavigationAction>
          <NavigationAction as="link" type="text" to="/rights">
            {t('rights')}
          </NavigationAction>
        </nav>
        <div onClick={scrollTop} className={styles.footer__scrollTop}>
          <span>{t('backToTop')}</span>
          <button className="button button--icon button--small">
            <span className="icon icon--chevron-active icon--rotate-90" />
          </button>
        </div>
      </div>
    </footer>
  );
};

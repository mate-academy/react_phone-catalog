import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/app/router';

import { Logo, Typography } from '@/components/atoms';
import { ArrowButton, CurrencySwitcher } from '@/components/molecules';

import styles from './Footer.module.scss';

type Props = {
  className?: string;
};

export const Footer = ({ className }: Props) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: 'github',
      label: 'GITHUB',
      to: 'https://github.com/Localhost-Enterprises',
      target: '_blank',
    },
    {
      id: 'contacts',
      label: t('footerContacts'),
      to: ROUTES.CONTACTS,
      target: '_self',
    },
    {
      id: 'rights',
      label: t('footerRights'),
      to: ROUTES.RIGHTS,
      target: '_self',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.container}>
        <div className={styles.itemContainer}>
          <Link
            to={ROUTES.HOME}
            aria-label="Go to home page"
          >
            <Logo
              size="big"
              className={styles.logo}
            />
          </Link>
        </div>

        <div className={classNames(styles.menu, styles.itemContainer)}>
          {menuItems.map(({ id, label, to, target }) => (
            <a
              href={to}
              key={id}
              target={target}
            >
              <Typography
                className={styles.typo}
                variant="uppercase"
              >
                {label}
              </Typography>
            </a>
          ))}

          <div className={styles.footerCurrency}>
            <CurrencySwitcher />
          </div>
        </div>

        <div className={styles.itemContainer}>
          <div
            className={classNames(styles.button_top)}
            onClick={scrollToTop}
          >
            <Typography
              className={styles.typo}
              variant="smalltext"
            >
              {t('footerBackToTop')}
            </Typography>
            <ArrowButton
              className={styles.arrowbutton}
              direction="up"
              aria-label="Scroll to top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

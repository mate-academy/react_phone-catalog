import React from 'react';
import styles from './Footer.module.scss';
import { LogoLink } from '../../../molecules/LogoLink';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { FOOTER_LINKS } from './constants';
import { NavLink } from '../../../atoms/NavLink';
import { Typography } from '../../../atoms/Typography';
import { ArrowButton } from '../../../atoms/ArrowButton';

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <footer className={classNames(styles.footer, className)}>
      <div className={styles.footer__content}>
        <div className={styles.footer__item}>
          <LogoLink />
        </div>

        <div className={styles.footer__item}>
          <nav className={styles.footer__nav}>
            {FOOTER_LINKS.map(({ label, path, target, rel, external }) => (
              <NavLink
                key={label}
                to={path}
                external={external}
                target={target}
                rel={rel}
                className={styles.footer__link}
              >
                {t(`navlink.${label}`)}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.footer__item}>
          <Typography
            variant="small"
            tag="label"
            color="secondary"
            className={styles.footer__button}
          >
            {t('buttons.actions.toTop')}
            <ArrowButton
              direction="up"
              size="small"
              className={styles.footer__button__element}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </Typography>
        </div>
      </div>
    </footer>
  );
};

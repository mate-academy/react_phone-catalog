import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import cn from 'classnames';

import { TLinks } from '@utils/constants/footerLinks';

import styles from './FooterNav.module.scss';

type TProps = {
  link: TLinks;
};

export const FooterNav: FC<TProps> = ({ link }) => {
  const { isExternal, href, name } = link;
  const { t } = useTranslation();

  const localName = t(`footer.${name}`);
  const localVisit = t(`footer.aria.visit`, { name: name });
  const localGo = t(`footer.aria.go`, { name: name });

  return isExternal ? (
    <a
      href={href}
      className={styles.link}
      title={localName}
      aria-label={localVisit}
      target="_blank"
      rel="noreferrer"
    >
      {localName}
    </a>
  ) : (
    <NavLink
      to={href}
      title={localName}
      className={({ isActive }) =>
        cn(styles.link, { [styles.active]: isActive })
      }
      aria-label={localGo}
    >
      {localName}
    </NavLink>
  );
};

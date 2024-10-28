import classNames from 'classnames';
import React from 'react';
import styles from './Menu.module.scss';
import { PagesPath } from '../../../../../types/PagesPath';
import { Favourites } from '../../../Icons/Favourites';
import { ShoppingBag } from '../../../Icons/ShoppingBag';
import { LinkItem } from '../LinkItem';

type PageLink = { name: string; path: string };

type Props = {
  isActive: boolean;
  onLinkClick: () => void;
  links: PageLink[];
};

export const Menu: React.FC<Props> = ({ isActive, onLinkClick, links }) => {
  return (
    <div
      className={classNames(styles.Menu, {
        [styles.Menu_active]: isActive,
      })}
    >
      <nav className={`${styles.Menu__list}`}>
        {links.map(link => (
          <LinkItem
            type="link"
            key={link.path}
            path={link.path}
            onClick={onLinkClick}
          >
            {link.name}
          </LinkItem>
        ))}
      </nav>

      <div className={styles.Menu__buttons}>
        <LinkItem type="btn" path={PagesPath.Favourites} onClick={onLinkClick}>
          <Favourites />
        </LinkItem>

        <LinkItem type="btn" path={PagesPath.Cart} onClick={onLinkClick}>
          <ShoppingBag />
        </LinkItem>
      </div>
    </div>
  );
};

import { Link, NavLink } from 'react-router-dom';

import { List } from '@shared/base/List';
import { ListItem } from '@shared/base/ListItem';
import { Text } from '@shared/base/Text';

import styles from './FooterNavigation.module.scss';
import { NAVIGATION_CONFIG } from '../../utils/navigation.config';

export const FooterNavigation = () => {
  return (
    <List className={styles.list}>
      {NAVIGATION_CONFIG.map(({ id, href, type, title, target }) => {
        const LinkComponent = type === 'link' ? Link : NavLink;

        return (
          <ListItem key={id} className={styles.item}>
            <LinkComponent to={href} className={styles.link} target={target}>
              <Text variant="uppercase" className={styles.text}>
                {title}
              </Text>
            </LinkComponent>
          </ListItem>
        );
      })}
    </List>
  );
};

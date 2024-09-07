import { FC } from 'react';

import styles from './BurgerMenu.module.scss';

type Props = {};

export const BurgerMenu: FC<Props> = ({}) => {
  return <button type="button" className={styles.themeButton}></button>;
};

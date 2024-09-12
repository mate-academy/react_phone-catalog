import { FC } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import styles from './icon.module.scss';

type TProps = {
  isOpen: boolean;
};

export const HeartIcon: FC<TProps> = ({ isOpen }) => {
  return isOpen ? <FaHeart className={styles.fill} /> : <FaRegHeart />;
};

import { FC } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import styles from './icon.module.scss';

type TProps = {
  isFavorite: boolean;
};

export const HeartIcon: FC<TProps> = ({ isFavorite }) => {
  return isFavorite ? <FaHeart className={styles.fill} /> : <FaRegHeart />;
};

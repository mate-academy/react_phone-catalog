import { Link } from 'react-router-dom';
import { SwiperData } from '../../model/types';
import styles from './SwiperSlide.module.scss';

type Props = {
  item: SwiperData;
};

export const SwiperSlide: React.FC<Props> = ({ item }) => {
  const { href, src, alt } = item;

  return (
    <Link className={`${styles['sw-slide']}`} to={href}>
      <img className={`${styles['sw-image']}`} src={src} alt={alt}></img>
    </Link>
  );
};

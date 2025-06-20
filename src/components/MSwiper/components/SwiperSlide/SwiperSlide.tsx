import { Link } from 'react-router-dom';
import styles from './SwiperSlide.module.scss';
import { SwiperData } from '../../../MySwiperProto/types/MSPtypes';

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

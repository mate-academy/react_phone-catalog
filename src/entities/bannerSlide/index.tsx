import { Link } from 'react-router-dom';
import styles from './styles/bannerSlide.module.scss';
import { BannerData } from './types/bannerSlide';

type Props = {
  item: BannerData;
  refer?: React.RefObject<HTMLLIElement>;
};

export const BannerSlide: React.FC<Props> = ({ item }) => {
  const { href, src, alt } = item;

  return (
    <Link className={styles.container} to={href}>
      <img className={styles.banner} src={src} alt={alt}></img>
    </Link>
  );
};

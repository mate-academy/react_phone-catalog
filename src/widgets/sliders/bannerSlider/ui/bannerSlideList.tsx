import { useSliderData } from '@shared/lib';
import { BannerData } from '@shared/types';
import { Link } from 'react-router-dom';
import styles from '../styles/bannerList.module.scss';

type Props = {
  data: BannerData[];
  onClick: (e: React.MouseEvent) => void;
};

export const BannerSlideList = ({ data, onClick }: Props) => {
  const { DOM } = useSliderData();

  return (
    <>
      <figure className={styles.link} aria-hidden="true">
        <img src={data[data.length - 1].src} alt="" className={styles.image} />
      </figure>
      {data.map((item, index) => (
        <Link
          key={index}
          aria-label={item.ariaLabel}
          to={'/phones'}
          className={styles.link}
          onClick={onClick}
          ref={
            index === 0
              ? (DOM.item as React.RefObject<HTMLAnchorElement>)
              : null
          }
        >
          <img
            src={item.src}
            alt={item.alt}
            className={styles.image}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </Link>
      ))}
      <figure className={styles.link} aria-hidden="true">
        <img src={data[0].src} alt="" className={styles.image} loading="lazy" />
      </figure>
    </>
  );
};

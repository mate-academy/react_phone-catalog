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
        <picture>
          <source
            media="(min-width: 640px)"
            srcSet={data[data.length - 1].srcWide}
          />
          <img
            src={data[data.length - 1].srcSquare}
            alt=""
            className={styles.image}
          />
        </picture>
      </figure>
      {data.map((item, index) => (
        <Link
          key={item.id}
          aria-label={item.ariaLabel}
          to={item.href}
          className={styles.link}
          onClick={onClick}
          ref={
            index === 0
              ? (DOM.item as React.RefObject<HTMLAnchorElement>)
              : null
          }
        >
          <picture>
            <source media="(min-width: 640px)" srcSet={item.srcWide} />
            <img
              src={item.srcSquare}
              alt={item.alt}
              className={styles.image}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </picture>
        </Link>
      ))}
      <figure className={styles.link} aria-hidden="true">
        <picture>
          <source media="(min-width: 640px)" srcSet={data[0].srcWide} />
          <img
            src={data[0].srcSquare}
            alt=""
            className={styles.image}
            loading="lazy"
          />
        </picture>
      </figure>
    </>
  );
};

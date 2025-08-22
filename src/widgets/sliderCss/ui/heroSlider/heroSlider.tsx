import { BannerData } from '@shared/types';
import { Link } from 'react-router-dom';
import styles from '../../styles/sliderMain.module.scss';
import { useSliderCore, useSliderData, useInfinite } from '../../model';
import { SliderButtons, InfiniteBlockPagination } from '../shared';

type Props = {
  data: BannerData[];
};
export const HeroSlider: React.FC<Props> = ({ data }) => {
  const amount = data.length;
  const { DOM, mechanics, gap } = useSliderData();
  const { handlers } = useSliderCore({ amount });

  useInfinite({ amount });
  const firstClone = data.at(-1) as BannerData;
  const lastClone = data.at(0) as BannerData;
  const dataIDs = data.map(el => el.id);

  return (
    <section className={styles['hero-slider']} aria-label="Featured promotions">
      <SliderButtons handler={handlers.onButton} />
      <div className={styles.viewport} ref={DOM.viewport} {...handlers}>
        <div
          className={styles.track}
          ref={DOM.track}
          style={
            {
              '--offset': `${mechanics.offset.current}px`,
              '--gap': `${gap}px`,
            } as React.CSSProperties
          }
        >
          <div className={styles.track__el}>
            <img
              src={firstClone.src}
              alt={firstClone.alt}
              className={styles.banner}
            />
          </div>
          {data.map(el => (
            <Link
              key={el.id}
              aria-label={el.ariaLabel}
              to={'/phones'}
              className={styles.track__el}
              onClick={e => handlers.onClick(e)}
              ref={el.id === 0 ? DOM.item : null}
            >
              <img src={el.src} alt={el.alt} className={styles.banner} />
            </Link>
          ))}
          <div className={styles.track__el}>
            <img
              src={lastClone.src}
              alt={lastClone.alt}
              className={styles.banner}
            />
          </div>
        </div>
      </div>
      <InfiniteBlockPagination
        dataIDs={dataIDs}
        handler={handlers.onPagination}
      />
    </section>
  );
};

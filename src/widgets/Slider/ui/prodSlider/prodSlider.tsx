import { BannerData } from '@shared/types';
import { Link } from 'react-router-dom';
import styles from '../../styles/sliderMain.module.scss';
import {
  useSliderCore,
  useSliderData,
  useInfinite,
  visualConfig,
} from '../../model';
import { SliderButtons, InfiniteBlockPagination } from '../shared';

type Props = {
  data: BannerData[];
  startIdx: number;
  amount: number;
};

export const ProdSlider: React.FC<Props> = ({
  data,
  startIdx,
  amount,
}: Props) => {
  const { animationSpeed, gap } = visualConfig;
  const { DOM } = useSliderData();
  const { handlers, setByIndex } = useSliderCore(startIdx, amount);

  useInfinite(amount);
  const firstClone = data.at(-1) as BannerData;
  const lastClone = data.at(0) as BannerData;
  const dataIDs = data.map(el => el.id);

  return (
    <section className={styles['hero-slider']} aria-label="Featured promotions">
      <SliderButtons setByIndex={setByIndex} posMod={1} />
      <div className={styles.viewport} ref={DOM.viewport} {...handlers}>
        <div
          className={styles.track}
          ref={DOM.track}
          tabIndex={0}
          style={
            {
              '--gap': `${gap}px`,
              '--animation-speed': `${animationSpeed}ms`,
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
              <img
                src={el.src}
                alt={el.alt}
                className={styles.banner}
                loading={el.id !== 0 ? 'lazy' : 'eager'}
              />
            </Link>
          ))}
          <div className={styles.track__el}>
            <img
              src={lastClone.src}
              alt={lastClone.alt}
              className={styles.banner}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <InfiniteBlockPagination
        dataIDs={dataIDs}
        setByIndex={setByIndex}
        startIndex={startIdx}
      />
    </section>
  );
};

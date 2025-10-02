import { BannerData } from '@shared/types';
import { Link } from 'react-router-dom';
import styles from '../../styles/sliderMain.module.scss';
import {
  useSliderCore,
  useSliderData,
  useInfinite,
  visualConfig,
} from '../../model';
import { SliderButtons, SliderPagination } from '../shared';

type Props = {
  data: BannerData[];
  startIdx: number;
  amount: number;
};

export const HeroSlider: React.FC<Props> = ({
  data,
  startIdx,
  amount,
}: Props) => {
  const { animationSpeed, gap } = visualConfig;
  const { DOM } = useSliderData();
  const { handlers, setByIndex } = useSliderCore(startIdx, amount);

  useInfinite(amount);

  return (
    <section className={styles['hero-slider']} aria-label="Featured promotions">
      <SliderButtons setByIndex={setByIndex} posMod={1} />
      <div className={styles.viewport} ref={DOM.viewport} {...handlers}>
        <div
          className={styles.track}
          ref={DOM.track as React.RefObject<HTMLDivElement>}
          tabIndex={0}
          style={
            {
              '--gap': `${gap}px`,
              '--animation-speed': `${animationSpeed}ms`,
            } as React.CSSProperties
          }
        >
          <figure className={styles.track__el}>
            <img
              src={(data.at(-1) as BannerData).src}
              alt={(data.at(-1) as BannerData).alt}
              className={styles.banner}
            />
          </figure>
          {data.map(el => (
            <Link
              key={el.id}
              aria-label={el.ariaLabel}
              to={'/phones'}
              className={styles.track__el}
              onClick={e => handlers.onClick(e)}
              ref={
                el.id === 0
                  ? (DOM.item as React.RefObject<HTMLAnchorElement>)
                  : null
              }
            >
              <img
                src={el.src}
                alt={el.alt}
                className={styles.banner}
                loading={el.id === 0 ? 'eager' : 'lazy'}
              />
            </Link>
          ))}
          <figure className={styles.track__el}>
            <img
              src={(data.at(0) as BannerData).src}
              alt={(data.at(0) as BannerData).alt}
              className={styles.banner}
              loading="lazy"
            />
          </figure>
        </div>
      </div>
      <SliderPagination
        amount={data.length}
        setByIndex={setByIndex}
        startIndex={startIdx}
      />
    </section>
  );
};

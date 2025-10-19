/* eslint-disable prettier/prettier */
import { BannerData } from '@shared/types';
import { useInfinite, useSliderCore, useSliderData } from '@shared/lib';
import { SliderPagination } from '@widgets/sliderPagination';
import { Status } from '@features/index';
import styles from './styles/bannerSlider.module.scss';
import { SliderButtons } from '../sharedUI';
import { BannerSlideList } from './ui';
import { LoaderSpinner } from '@ui/skeletons';

type Props = {
  data: BannerData[] | Status;
};

export const BannerSlider: React.FC<Props> = ({ data }: Props) => {
  const gap = 16;
  const animationSpeed = 300;
  const { DOM } = useSliderData();

  const array = data;
  const ariaLabel = 'Featured promotions';
  const { handlers, setByIndex } = useSliderCore(array.length, gap);

  const paginationProps =
    typeof data === 'string'
      ? Status.LOADING
      : {
        amount: array.length,
        setByIndex: setByIndex,
      };

  useInfinite(array.length, animationSpeed, gap);

  return (
    <section className={styles['hero-slider']} aria-label={ariaLabel}>
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
          {data === Status.LOADING || data === Status.ERROR ? (
            <LoaderSpinner />
          ) : (
            <BannerSlideList data={data} onClick={handlers.onClick} />
          )}
        </div>
      </div>
      <SliderPagination data={paginationProps} />
    </section>
  );
};

/* eslint-disable prettier/prettier */
import { BannerData } from '@shared/types';
import { useInfinite, useSliderCore, useSliderData } from '@shared/lib';
import { SliderPagination } from '@widgets/sliderPagination';
import styles from './styles/bannerSlider.module.scss';
import { SliderButtons } from '../sharedUI';
import { BannerSlideList } from './ui';
import { LoaderSpinner } from '@ui/skeletons';
import { LoadStatus } from '@shared/api';

type Props = {
  data: BannerData[] | LoadStatus;
};

const GAP = 16;
const ANIMATION_SPEED = 300;

export const BannerSlider: React.FC<Props> = ({ data }: Props) => {
  const { DOM } = useSliderData();

  const length = typeof data === 'string' ? 0 : data.length;
  const ariaLabel = 'Featured promotions';
  const { handlers, setByIndex } = useSliderCore(length, GAP, true);

  const paginationProps =
    typeof data === 'string'
      ? LoadStatus.LOADING
      : {
        amount: data.length,
        setByIndex: setByIndex,
      };

  useInfinite(length, ANIMATION_SPEED, GAP);

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
              '--gap': `${GAP}px`,
              '--animation-speed': `${ANIMATION_SPEED}ms`,
            } as React.CSSProperties
          }
        >
          {data === LoadStatus.LOADING || data === LoadStatus.ERROR ? (
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

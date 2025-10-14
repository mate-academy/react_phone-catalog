/* eslint-disable @typescript-eslint/indent */
import { BannerData } from '@shared/types';
import { useInfinite, useSliderCore, useSliderData } from '@shared/lib';
import { config } from './model';
import { SliderButtons } from './ui/buttons/sliderButton';
import { SliderPagination } from '@widgets/sliderPagination';
import { BannerSlideList, ProductSlideList } from './ui/slideLists';

type Props = {
  data: BannerData[] | { images: string[]; name: string };
};

const isDataBannerData = (
  data: BannerData[] | { images: string[]; name: string },
): data is BannerData[] => {
  return Array.isArray(data);
};

export const InfiniteSlider: React.FC<Props> = ({ data }: Props) => {
  const bannerMode = isDataBannerData(data);
  const { buttons, styles, gap, animationSpeed } = config[+bannerMode];
  const { DOM } = useSliderData();

  const array = bannerMode ? data : data.images;
  const ariaLabel = bannerMode
    ? 'Featured promotions'
    : 'Product image gallery';
  const { handlers, setByIndex } = useSliderCore(array.length, gap);

  useInfinite(array.length, animationSpeed, gap);

  return (
    <section className={styles.container} aria-label={ariaLabel}>
      {buttons && <SliderButtons setByIndex={setByIndex} posMod={1} />}
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
          {bannerMode ? (
            <BannerSlideList data={data} onClick={handlers.onClick} />
          ) : (
            <ProductSlideList data={data.images} name={data.name} />
          )}
        </div>
      </div>
      <SliderPagination
        amount={array.length}
        setByIndex={setByIndex}
        {...(bannerMode ? undefined : { images: array as string[] })}
      />
    </section>
  );
};

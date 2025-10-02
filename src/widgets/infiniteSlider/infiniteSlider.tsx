/* eslint-disable @typescript-eslint/indent */
import { BannerData, Product } from '@shared/types';
import { useInfinite, useSliderCore, useSliderData } from '@shared/lib';
import { config } from './model';
import { SliderButtons } from './ui/sliderButton';
import { SliderPagination } from '@widgets/sliderPagination';
import { BannerSlideList, ProductSlideList } from './ui/slideLists';

type Props = {
  data: BannerData[] | Product;
};

const isDataBannerData = (
  data: BannerData[] | Product,
): data is BannerData[] => {
  return Array.isArray(data);
};

export const Slider: React.FC<Props> = ({ data }: Props) => {
  const bannerMode = isDataBannerData(data);
  const { buttons, styles, gap, animationSpeed } = config[+bannerMode];
  const { DOM } = useSliderData();

  const array = bannerMode ? data : data.images;
  const { handlers, setByIndex } = useSliderCore(array.length, gap);

  useInfinite(array.length, animationSpeed, gap);

  return (
    <section className={styles.container} aria-label="Featured promotions">
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

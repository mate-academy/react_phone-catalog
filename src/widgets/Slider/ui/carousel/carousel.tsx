/* eslint-disable prettier/prettier */
import { BannerSlide } from '@entities/bannerSlide';
import { SliderType, VisualConfig } from '../../lib/types';
import { useSlContext } from '../../model/context/sliderContext';
import { BannerData } from '@entities/bannerSlide/model/bannerSlide';
import { ProductCard } from '@entities/prodCard';
import { BaseProduct } from '@shared/types/APITypes';
import styles from '../../styles/basicSlider.module.scss';

type Props = {
  visualConfig: VisualConfig;
  className: string;
  handlers: {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
  }
};

export const Carousel: React.FC<Props> = ({
  visualConfig,
  className,
  handlers
}) => {
  const { VP, track, trackElement, list, type } = useSlContext();
  const { gap, animationSpeed } = visualConfig;

  return (
    <div className={`${className} ${styles.viewport}`} ref={VP} {...handlers}>
      <ul
        ref={track}
        className={styles.carousel}
        style={
          {
            '--gap': `${gap}px`,
            '--transition-duration': `${animationSpeed}ms`,
          } as React.CSSProperties
        }
      >
        { type === SliderType.BANNER
          ? list.map(el => (
            <li
              key={el.idx}
              ref={el.idx === 1 ? trackElement : undefined}
              className={styles['carousel__banner-el']}
            >
              <BannerSlide item={el as BannerData} />
            </li>
          ))
          : list.map( el =>
            <ProductCard
              key={el.idx}
              product={el as BaseProduct}
              ref={el.idx === 1 ? trackElement : undefined}
            />
          )}
      </ul>
    </div>
  );
};

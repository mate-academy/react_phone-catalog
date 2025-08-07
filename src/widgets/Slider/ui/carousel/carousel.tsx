/* eslint-disable prettier/prettier */
import { BannerSlide } from '@entities/bannerSlide';
import { SliderType } from '../../types/types';
import { useSlContext } from '../../model/context/sliderContext';
import { BannerData } from '@entities/bannerSlide/types/bannerSlide';
import { ProductCard } from '@entities/prodCard';
import { CatalogueProduct } from '@shared/types/APIReturnTypes';
import styles from '../../styles/basicSlider.module.scss';
import { useProdCard } from '@entities/prodCard/model/useProdCard';

type Props = {
  gap: number;
  animationSpeed: number;
  className: string;
  handlers: {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
  }
};

export const Carousel: React.FC<Props> = ({
  gap,
  animationSpeed,
  className,
  handlers
}) => {
  const { VP, track, trackElement, list, type } = useSlContext();
  const {stateHandlers, isIn } = useProdCard();
  const conditionalStyles = type === SliderType.BANNER ? { width: '100%' } : {};

  return (
    <div className={`${className} ${styles.viewport}`} ref={VP} {...handlers}>
      <ul
        ref={track}
        className={styles.carousel}
        style={
          {
            '--gap': `${gap}px`,
            '--transition-duration': `${animationSpeed}ms`,
            ...conditionalStyles,
          } as React.CSSProperties & Record<string, string>
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
              product={el as CatalogueProduct}
              isIn={isIn}
              stateHandlers={stateHandlers}
              ref={el.idx === 1 ? trackElement : undefined}
            />
          )}
      </ul>
    </div>
  );
};

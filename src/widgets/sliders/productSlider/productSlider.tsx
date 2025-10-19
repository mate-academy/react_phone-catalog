/* eslint-disable prettier/prettier */
import { useInfinite, useSliderCore, useSliderData } from '@shared/lib';
import { ImagePagination } from '@widgets/sliderPagination';
import styles from './styles/productSlider.module.scss';
import { ProductSlideList } from './ui/productSlideList';
import { Status } from '@features/index';
import { LoaderSpinner } from '@ui/skeletons';

type Props = {
  data: { images: string[]; name: string } | Status;
};

const FALLBACK_LENGTH = 4;

export const ProductSlider: React.FC<Props> = ({ data }: Props) => {
  const gap = 16;
  const animationSpeed = 300;
  const { DOM } = useSliderData();

  const length =
    typeof data === 'string' ? FALLBACK_LENGTH : data.images.length;

  const ariaLabel = 'Product image gallery';
  const { handlers, setByIndex } = useSliderCore(length, gap);

  useInfinite(length, animationSpeed, gap);

  const trackHight = typeof data === 'string' ? '100%' : 'auto';

  const paginationProps =
    typeof data === 'string'
      ? Status.LOADING
      : {
        images: data.images,
        setByIndex: setByIndex,
      };

  return (
    <section className={styles['product-slider']} aria-label={ariaLabel}>
      <div className={styles.viewport} ref={DOM.viewport} {...handlers}>
        <div
          className={styles.track}
          ref={DOM.track as React.RefObject<HTMLDivElement>}
          tabIndex={0}
          style={
            { 'height': trackHight,
              '--gap': `${gap}px`,
              '--animation-speed': `${animationSpeed}ms`,
            } as React.CSSProperties
          }
        >
          {typeof data === 'string' ? (
            <LoaderSpinner />
          ) : (
            <ProductSlideList data={data.images} name={data.name} />
          )}
        </div>
      </div>

      <ImagePagination data={paginationProps} />
    </section>
  );
};

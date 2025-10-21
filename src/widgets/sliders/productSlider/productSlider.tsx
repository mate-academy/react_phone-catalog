import { useInfinite, useSliderCore, useSliderData } from '@shared/lib';
import { ImagePagination } from '@widgets/sliderPagination';
import styles from './styles/productSlider.module.scss';
import { ProductSlideList } from './ui/productSlideList';
import { Status } from '@features/index';
import { LoaderSpinner } from '@ui/skeletons';

type Props = {
  data: { images: string[]; name: string } | Status;
};

const GAP = 16;
const ANIMATION_SPEED = 300;

export const ProductSlider: React.FC<Props> = ({ data }: Props) => {
  const { DOM } = useSliderData();

  const length = typeof data === 'string' ? 0 : data.images.length;

  const { handlers, setByIndex } = useSliderCore(length, GAP);

  useInfinite(length, ANIMATION_SPEED, GAP);

  const paginationProps =
    typeof data === 'string'
      ? Status.LOADING
      : { images: data.images, setByIndex: setByIndex };

  return (
    <section
      className={styles['product-slider']}
      aria-label="Product image gallery"
    >
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

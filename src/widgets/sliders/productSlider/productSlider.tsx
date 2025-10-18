import { useInfinite, useSliderCore, useSliderData } from '@shared/lib';
import { SliderPagination } from '@widgets/sliderPagination';
import styles from './styles/productSlider.module.scss';
import { ProductSlideList } from './ui/productSlideList';

type Props = {
  data: { images: string[]; name: string };
};

export const ProductSlider: React.FC<Props> = ({ data }: Props) => {
  const gap = 16;
  const animationSpeed = 300;
  const { DOM } = useSliderData();

  const length = data.images.length;

  const ariaLabel = 'Product image gallery';
  const { handlers, setByIndex } = useSliderCore(length, gap);

  useInfinite(length, animationSpeed, gap);

  return (
    <section className={styles['product-slider']} aria-label={ariaLabel}>
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
          <ProductSlideList data={data.images} name={data.name} />
        </div>
      </div>

      <SliderPagination
        amount={length}
        setByIndex={setByIndex}
        images={data.images}
      />
    </section>
  );
};

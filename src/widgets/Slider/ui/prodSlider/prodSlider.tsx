import styles from '../../styles/prodSlider.module.scss';
import {
  useSliderCore,
  useSliderData,
  useInfinite,
  visualConfig,
} from '../../model';
import { Product } from '@shared/types';
import { AdaptivePagination } from '../shared/pagination/adaptivePagination';

type Props = {
  data: Product;
  startIdx: number;
  amount: number;
};

export const ProdSlider: React.FC<Props> = ({
  data,
  startIdx,
  amount,
}: Props) => {
  const { animationSpeed, gap } = visualConfig;
  const { DOM } = useSliderData();
  const { handlers, setByIndex } = useSliderCore(startIdx, amount);

  useInfinite(amount);

  return (
    <section
      className={styles['prod-slider']}
      aria-label={`${data.name} images`}
    >
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
              src={data.images.at(-1)}
              alt={data.name}
              className={styles.image}
            />
          </figure>
          {data.images.map((image, index) => (
            <figure
              key={index}
              className={styles.track__el}
              onClick={e => handlers.onClick(e)}
              ref={
                index === 0 ? (DOM.item as React.RefObject<HTMLElement>) : null
              }
            >
              <img
                src={image}
                alt={data.name}
                className={styles.image}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
          <div className={styles.track__el}>
            <img
              src={data.images.at(0)}
              alt={data.name}
              className={styles.image}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <AdaptivePagination
        amount={data.images.length}
        setByIndex={setByIndex}
        startIndex={startIdx}
        images={data.images}
      />
    </section>
  );
};

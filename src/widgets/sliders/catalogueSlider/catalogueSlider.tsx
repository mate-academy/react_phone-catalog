import { useSliderCore, useSliderData } from '@shared/lib';
import styles from './styles/catalogueSlider.module.scss';
import { SliderButtons } from '../sharedUI';
import { CatalogueData } from '@shared/api/types';
import { Status } from '@features/index';
import { ProductCardList } from './ui/productCardList';
import { SkeletonList } from './ui/skeletonList';

type Props = {
  data: CatalogueData | Status;
  title: string;
};

export const CatalogueSlider: React.FC<Props> = ({ data, title }: Props) => {
  const amount = typeof data === 'string' ? 0 : data.items.length;
  const animationSpeed = 300;
  const gap = 16;
  const { DOM, measure, mechanics } = useSliderData();
  const { handlers, setByIndex } = useSliderCore(amount, gap);

  const disableButtons = [
    mechanics.index.current === 0,
    mechanics.index.current ===
      amount -
        Math.ceil(measure.VPWidth.current / (measure.itemWidth.current + gap)),
  ];

  return (
    <section
      className={styles['catalogue-slider']}
      aria-label="Items catalogue"
    >
      <h2 className={styles.title}>{title}</h2>
      <SliderButtons
        setByIndex={setByIndex}
        posMod={Math.floor(measure.VPWidth.current / measure.itemWidth.current)}
        clamp={true}
        disable={disableButtons}
      />
      <div className={styles.viewport} ref={DOM.viewport} {...handlers}>
        <ul
          className={styles.track}
          ref={DOM.track as React.RefObject<HTMLUListElement>}
          tabIndex={0}
          style={
            {
              '--gap': `${gap}px`,
              '--animation-speed': `${animationSpeed}ms`,
            } as React.CSSProperties
          }
        >
          {data === Status.LOADING || data === Status.ERROR ? (
            <SkeletonList />
          ) : (
            <ProductCardList data={data.items} />
          )}
        </ul>
      </div>
    </section>
  );
};

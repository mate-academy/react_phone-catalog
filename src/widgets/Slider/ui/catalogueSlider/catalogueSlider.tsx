import { CatalogueProduct } from '@shared/types';
import styles from '../../styles/catalogueSlider.module.scss';
import { useSliderCore, useSliderData, visualConfig } from '../../model';
import { SliderButtons } from '../shared';
import { useProdCard } from '@features/useProductCard/useProdCard';
import { ProductCard } from '@entities/prodCard';

type Props = {
  data: CatalogueProduct[];
  startIdx: number;
  amount: number;
  title: string | undefined;
};

export const CatalogueSlider: React.FC<Props> = ({
  data,
  startIdx,
  amount,
  title,
}: Props) => {
  const { animationSpeed, gap } = visualConfig;
  const { DOM, measure, mechanics } = useSliderData();
  const { handlers, setByIndex } = useSliderCore(startIdx, amount);
  const { isIn, stateHandlers } = useProdCard();

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
          {data.map(el => (
            <ProductCard
              product={el}
              key={el.key}
              isIn={isIn}
              stateHandlers={stateHandlers}
              ref={
                data.indexOf(el) === 0
                  ? (DOM.item as React.RefObject<HTMLLIElement>)
                  : null
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

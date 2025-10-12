import { CatalogueProduct } from '@shared/types';
import { useProdCard } from '@features/productCard/useProdCard';
import { ProductCard } from '@entities/prodCard';
import { useSliderCore, useSliderData } from '@shared/lib';
import { catalogueConfig } from './model/config';
import { SliderButtons } from './ui/buttons';

type Props = {
  array: CatalogueProduct[];
  title: string;
};

export const CatalogueSlider: React.FC<Props> = ({ array, title }: Props) => {
  const amount = array.length;
  const { animationSpeed, gap, styles } = catalogueConfig;
  const { DOM, measure, mechanics } = useSliderData();
  const { handlers, setByIndex } = useSliderCore(amount, gap);
  const { isIn, stateHandlers } = useProdCard();

  const disableButtons = [
    mechanics.index.current === 0,
    mechanics.index.current ===
      amount -
        Math.ceil(measure.VPWidth.current / (measure.itemWidth.current + gap)),
  ];

  return (
    <section className={styles.container} aria-label="Items catalogue">
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
          {array.map(el => (
            <ProductCard
              product={el}
              key={el.key}
              isIn={isIn}
              stateHandlers={stateHandlers}
              ref={
                array.indexOf(el) === 0
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

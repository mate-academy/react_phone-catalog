import { useSliderCore, useSliderData } from '@shared/lib';
import styles from './styles/catalogueSlider.module.scss';
import { SliderButtons } from '../sharedUI';
import { ProductCards } from '@ui/productCards/productCards';
import { UILoadStatus } from '@features/useUILoader';
import { CatalogueData } from '@shared/api';

type Props = {
  data: CatalogueData | UILoadStatus;
  title: string;
  lazy?: boolean;
};

const FALLBACK_AMOUNT = 8;
const ANIMATION_SPEED = 300;
const GAP = 16;

export const CatalogueSlider: React.FC<Props> = ({
  data,
  title,
  lazy = false,
}: Props) => {
  const amount = typeof data === 'string' ? 0 : data.items.length;
  const { DOM, measure, mechanics } = useSliderData();
  const { handlers, setByIndex } = useSliderCore(amount, GAP);

  const disableButtons = [
    mechanics.index.current === 0,
    mechanics.index.current ===
      amount -
        Math.ceil(measure.VPWidth.current / (measure.itemWidth.current + GAP)),
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
              '--gap': `${GAP}px`,
              '--animation-speed': `${ANIMATION_SPEED}ms`,
            } as React.CSSProperties
          }
        >
          <ProductCards
            data={data}
            lazy={lazy}
            firstItemRef={DOM.item as React.RefObject<HTMLLIElement>}
            fallbackAmount={FALLBACK_AMOUNT}
          />
        </ul>
      </div>
    </section>
  );
};

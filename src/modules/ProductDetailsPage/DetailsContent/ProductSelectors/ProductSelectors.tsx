/* eslint-disable jsx-a11y/label-has-associated-control */
import { breakpoints } from '../../../../Services/MediaBreakpoints';
import { useMediaQuery } from '../../../../Services/UseMediaQuery';
import { ProductFullInfo } from '../../../../types/ProductFullInfo';
import styles from './ProductSelectors.module.scss';

type ProductSelectorsProps = {
  chosedItem: ProductFullInfo;
  selectedColor: string;
  setSelectedColor: (val: string) => void;
  selectedCapacity: string;
  setSelectedCapacity: (val: string) => void;
};

export const ProductSelectors: React.FC<ProductSelectorsProps> = ({
  chosedItem,
  selectedColor,
  setSelectedColor,
  selectedCapacity,
  setSelectedCapacity,
}) => {
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.desktop}px)`);

  return !isDesktop ? (
    <div className={styles.selectors}>
      {/* Сolor selection */}

      <section className={styles.colorSelection}>
        <div className={styles.colorSelection_colors}>
          <span className={styles.caption}>Available colors</span>

          <div className={styles.colorSelection_radio}>
            {chosedItem.colorsAvailable.map(color => (
              <label key={color} className={styles.colorSelection_label}>
                <input
                  type="radio"
                  name="color"
                  className={styles.colorSelection_input}
                  value={color}
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                />
              </label>
            ))}
          </div>
        </div>

        <span
          className={styles.colorSelection_id}
        >{`id: ${chosedItem.namespaceId}`}</span>
      </section>

      <div className={styles.underline}></div>

      {/* Сapacity selection */}

      <section className={styles.capacitySelection}>
        <span className={styles.caption}>Select capacity</span>

        <div className={styles.capacitySelection_selection}>
          {chosedItem.capacityAvailable.map(capacity => (
            <div key={capacity}>
              <input
                type="radio"
                className={styles.capacitySelection_input}
                id={`capacity-${capacity}`}
                name="capacity"
                value={capacity}
                checked={selectedCapacity === capacity}
                onChange={() => setSelectedCapacity(capacity)}
              />
              <label
                className={styles.capacitySelection_label}
                htmlFor={`capacity-${capacity}`}
              >
                {capacity}
              </label>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.underline}></div>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.selectors}>
        {/* Сolor selection */}
        <section className={styles.colorSelection}>
          <div className={styles.colorSelection_colors}>
            <span className={styles.caption}>Available colors</span>
            <div className={styles.colorSelection_radio}>
              {chosedItem.colorsAvailable.map(color => (
                <label key={color} className={styles.colorSelection_label}>
                  <input
                    type="radio"
                    name="color"
                    className={styles.colorSelection_input}
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                  />
                </label>
              ))}
            </div>
          </div>
        </section>
        <div className={styles.underline}></div>
        {/* Сapacity selection */}
        <section className={styles.capacitySelection}>
          <span className={styles.caption}>Select capacity</span>
          <div className={styles.capacitySelection_selection}>
            {chosedItem.capacityAvailable.map(capacity => (
              <div key={capacity}>
                <input
                  type="radio"
                  className={styles.capacitySelection_input}
                  id={`capacity-${capacity}`}
                  name="capacity"
                  value={capacity}
                  checked={selectedCapacity === capacity}
                  onChange={() => setSelectedCapacity(capacity)}
                />
                <label
                  className={styles.capacitySelection_label}
                  htmlFor={`capacity-${capacity}`}
                >
                  {capacity}
                </label>
              </div>
            ))}
          </div>
        </section>
        <div className={styles.underline}></div>
      </div>

      <span
        className={styles.wrapper_id}
      >{`id: ${chosedItem.namespaceId}`}</span>
    </div>
  );
};

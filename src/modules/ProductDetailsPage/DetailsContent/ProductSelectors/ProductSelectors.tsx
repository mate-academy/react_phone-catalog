/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import { breakpoints } from '../../../../Services/MediaBreakpoints';
import { useMediaQuery } from '../../../../Services/UseMediaQuery';
import { ProductFullInfo } from '../../../../types/ProductFullInfo';
import styles from './ProductSelectors.module.scss';

type Selectors = 'color' | 'capacity';

type ProductSelectorsProps = {
  chosedItem: ProductFullInfo;
  setChosedItem: (product: ProductFullInfo) => void;
  fullInfoList: ProductFullInfo[];
  selectedColor: string;
  setSelectedColor: (val: string) => void;
  selectedCapacity: string;
  setSelectedCapacity: (val: string) => void;
};

export const ProductSelectors: React.FC<ProductSelectorsProps> = ({
  chosedItem,
  setChosedItem,
  fullInfoList,
  selectedColor,
  setSelectedColor,
  selectedCapacity,
  setSelectedCapacity,
}) => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.desktop}px)`);

  const changeSelectedProduct = (value: string, selector: Selectors) => {
    const modelGroup = fullInfoList.filter(
      model => model.namespaceId === chosedItem.namespaceId,
    );

    const modelToChange = modelGroup.find(item => {
      if (selector === 'capacity') {
        return item.capacity === value && item.color === chosedItem.color;
      }

      return item.color === value && item.capacity === chosedItem.capacity;
    });

    if (modelToChange) {
      navigate(`/product/${modelToChange.id}`);
      setChosedItem(modelToChange);
    }
  };

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
                  onChange={() => {
                    setSelectedColor(color);
                    changeSelectedProduct(color, 'color');
                  }}
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
                onChange={() => {
                  setSelectedCapacity(capacity);
                  changeSelectedProduct(capacity, 'capacity');
                }}
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
                    onChange={() => {
                      setSelectedColor(color);
                      changeSelectedProduct(color, 'color');
                    }}
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
                  onChange={() => {
                    setSelectedCapacity(capacity);
                    changeSelectedProduct(capacity, 'capacity');
                  }}
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

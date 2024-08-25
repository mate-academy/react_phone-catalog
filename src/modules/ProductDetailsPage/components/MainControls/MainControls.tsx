import React from 'react';
import styles from './MainControls.module.scss';
import { ActionButtons } from '../../../../components/ActionButtons';
import { useAppContext } from '../../../../context/AppContext';
/* import { Link } from 'react-router-dom'; */

type MainControlsProps = {
  dynamicColor: string;
  setDynamicColor: (details: string) => void;
  dynamicCapacity: string;
  setDynamicCapacity: (details: string) => void;
}

export const MainControls: React.FC<MainControlsProps> = ({setDynamicColor, setDynamicCapacity}) => {
  const { clickedProduct, productDetails} = useAppContext();

const handleColorChange = (color: string) => {
  setDynamicColor(color.toLowerCase())
}

const handleColorCapacity = (capacity: string) => {
  setDynamicCapacity(capacity.toLowerCase())
}

/* useEffect(() => {
  console.log(dynamicColor,dynamicCapacity)
},[dynamicColor,dynamicCapacity]) */

  if (productDetails) {
    return (
      <div className={styles.mainControls}>
        <div className={styles.selector}>
          <p className={styles.label}>Available colors</p>

          <div className={styles.buttons}>
            {productDetails.colorsAvailable.map((color: string) => (
              <div
                className={styles.colorButtonContainer}
                key={color}
              >
                {/* <Link to={`/product/${newProductId}`}> */}
                  <button
                    className={styles.colorButton}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                {/* </Link> */}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.selector}>
          <p className={styles.label}>Select Capacity</p>

          <div className={styles.buttons}>
            {productDetails.capacityAvailable.map((capacity: string) => (
              <button
                className={styles.capacityButton}
                key={capacity}
                onClick={() => handleColorCapacity(capacity)}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.price}>
          <div className={styles.existPrice}>
            ${`${productDetails.priceRegular}`}
          </div>
          <div className={styles.hotPrice}>
            ${`${productDetails.priceDiscount}`}
          </div>
        </div>

        <ActionButtons product={clickedProduct} />

        <ul className={styles.specsList}>
          <li className={styles.specs}>
            <strong className={styles.specsKey}>Screen</strong>
            <span className={styles.specsValue}>
              {`${productDetails.screen}`}
            </span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Resolution</strong>
            <span className={styles.specsValue}>
              {`${productDetails.resolution}`}
            </span>
          </li>

          <li className={styles.specs}>
            <strong className={styles.specsKey}>Processor</strong>
            <span className={styles.specsValue}>
              {`${productDetails.processor}`}
            </span>
          </li>
        </ul>
      </div>
    );
  } else {
    return <div />;
  }
};

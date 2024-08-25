import React from 'react';
import styles from './MainControls.module.scss';
import { ActionButtons } from '../../../../components/ActionButtons';
import { useAppContext } from '../../../../context/AppContext';
/* import { Product } from '../../../../types/Product'; */



export const MainControls: React.FC = () => {
  const { handleNotReady, clickedProduct, productDetails/* , setProductDetails  */} = useAppContext();

  let colorsAvailable: string[] = [''];
  let capacityAvailable: string[] = [''];

  if (productDetails !== undefined) {
    colorsAvailable = productDetails.colorsAvailable;
    capacityAvailable = productDetails.capacityAvailable;
  }

  if (productDetails !== undefined) {
    return (
      <div className={styles.mainControls}>
        <div className={styles.selector}>
          <p className={styles.label}>Available colors</p>

          <div className={styles.buttons}>
            {colorsAvailable.map((color: string) => (
              <div
                className={styles.colorButtonContainer}
                key={color}
              >
                <button
                  className={styles.colorButton}
                  onClick={handleNotReady}
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.selector}>
          <p className={styles.label}>Select Capacity</p>

          <div className={styles.buttons}>
            {capacityAvailable.map((capacity: string) => (
              <button
                className={styles.capacityButton}
                onClick={handleNotReady}
                key={capacity}
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

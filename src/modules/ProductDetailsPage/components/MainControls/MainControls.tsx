import React from 'react';
import styles from './MainControls.module.scss';
import { ActionButtons } from '../../../../components/ActionButtons';
import { useAppContext } from '../../../../context/AppContext';

export const MainControls: React.FC = () => {
  const { clickedProduct } = useAppContext();

  // Placeholder function for attribute changes
  /*   const handleAttributeChange = (color: string, capacity: string) => {
    console.log(`Selected color: ${color}, capacity: ${capacity}`);
  }; */
if (clickedProduct !== undefined) {
  return (
    <div className={styles.mainControls}>

      <div className={styles.selector}>
        <p className={styles.label}>Available colors</p>

        <div className={styles.buttons}>
          <div
            className={styles.colorButtonContainer}
          >
            <button
              className={styles.colorButton}
            />
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.selector}>
        <p className={styles.label}>Select Capacity</p>

        <div className={styles.buttons}>
          <button
            className={styles.capacityButton}
          >
            {`${clickedProduct.capacity}`}
          </button>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.price}>
        <div className={styles.existPrice}>${`${clickedProduct.priceRegular}`}</div>
        <div className={styles.hotPrice}>${`${clickedProduct.priceDiscount}`}</div>
      </div>

      <ActionButtons />

      <ul className={styles.specsList}>
        <li className={styles.specs}>
          <strong className={styles.specsKey}>Screen</strong>
          <span className={styles.specsValue}>{`${clickedProduct.screen}`}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Resolution</strong>
          <span className={styles.specsValue}>{`${clickedProduct.resolution}`}</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Processor</strong>
          <span className={styles.specsValue}>{`${clickedProduct.processor}`}</span>
        </li>
      </ul>
    </div>
  );
} else return <div/>
}

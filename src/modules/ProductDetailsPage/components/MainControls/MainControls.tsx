import React from 'react';
import styles from './MainControls.module.scss';
import { ActionButtons } from '../../../../components/ActionButtons';
/* import { useAppContext } from '../../../../context/AppContext'; */




export const MainControls: React.FC = () => {
/*   const {clickedProductId} = useAppContext(); */
  return (
    <div className={styles.mainControls}>
      <div className={styles.selector}>
        <p className={styles.label}>Available colors</p>

        <div className={styles.buttons}>
          {/* {productDetails.colorsAvailable.map(color => ( */}
            <div
              className={styles.colorButtonContainer}
              /* key={color} */
            >
              <button
                /* value={color} */
                /* style={{ backgroundColor: color }} */
                className={styles.colorButton}
                /* onClick={() =>
                  handleAttributeChange(color, productDetails.capacity)
                } */
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
              /* key={capacity} */
              /* value={capacity} */
            /*   className={classNames(styles.capacityButton, {
                [styles.active]: productDetails.capacity === capacity,
              })}
              onClick={() =>
                handleAttributeChange(productDetails.color, capacity)
              } */
            >
              xxx
            </button>
          {/* ))} */}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.price}>
        <div className={styles.existPrice}>$XXX</div>
        <div className={styles.hotPrice}>$XXX</div>
      </div>

      <ActionButtons />

      <ul className={styles.specsList}>
        <li className={styles.specs}>
          <strong className={styles.specsKey}>Screen</strong>
          <span className={styles.specsValue}>XXX</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Resolution</strong>
          <span className={styles.specsValue}>XXX</span>
        </li>

        <li className={styles.specs}>
          <strong className={styles.specsKey}>Processor</strong>
          <span className={styles.specsValue}>XXX</span>
        </li>
      </ul>

    </div>
  );
};

import React from 'react';
import styles from './MainControls.module.scss';
import { ActionButtons } from '../../../../components/ActionButtons';
import { useAppContext } from '../../../../context/AppContext';

export const MainControls: React.FC = () => {
  const { clickedProduct, handleNotReady } = useAppContext();
  let colorsAvailable: string[] = [''];
  let capacityAvailable: string[] = [''];

/*   useEffect(()=> { */
    if (clickedProduct !== undefined) {
      colorsAvailable = clickedProduct.colorsAvailable;
      capacityAvailable = clickedProduct.capacityAvailable;
    }

/*   },[clickedProduct]) */

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
        {colorsAvailable.map((color: string)=>
          <div
            className={styles.colorButtonContainer}

          >

            <button
            className={styles.colorButton}
            key={color}
            onClick={handleNotReady}
            style = {typeof color === 'string' ? {backgroundColor: color} : undefined}
            >


            </button>
            </div>
            )};


        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.selector}>
        <p className={styles.label}>Select Capacity</p>

        <div className={styles.buttons}>

        {capacityAvailable.map((capacity: string)=>
          <button
            className={styles.capacityButton}
            onClick={handleNotReady}
            key={capacity}
          >
            {capacity}
          </button>
        )}



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

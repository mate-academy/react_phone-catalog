import React/* ,{useEffect} */ from 'react';
import styles from './MainControls.module.scss';
import { ActionButtons } from '../../../../components/ActionButtons';
import { useAppContext } from '../../../../context/AppContext';
import { LimitedProduct } from '../../../../types/Product';
/* import { Link } from 'react-router-dom'; */

type MainControlsProps = {
  dynamicColor: string;
  setDynamicColor: (details: string) => void;
  dynamicCapacity: string;
  setDynamicCapacity: (details: string) => void;
}

export const MainControls: React.FC<MainControlsProps> = () => {
  const { clickedProduct, setClickedProduct, productDetails, products, } = useAppContext();

  const handleChange = (input: string[]) => {
    let currentId = '';
    let currentCapacity: string ='';
    let currentColor: string ='';

    if (clickedProduct !== undefined) {
      currentId = clickedProduct.itemId.toLowerCase();
      currentColor = clickedProduct.color.toLowerCase();
      currentCapacity = clickedProduct.capacity.toLowerCase();
    } else if (productDetails !== undefined) {
      currentId = productDetails.id.toLowerCase();
      currentColor = productDetails.color.toLowerCase();
      currentCapacity = productDetails.capacity.toLowerCase();
    }

    let currentIdArray = currentId.split('-');

    if (input[0] === 'color') {
      const index = currentIdArray.indexOf(currentColor);
      if (index !== -1) {
        currentIdArray[index] = input[1].toLowerCase();
      }
    }

    if (input[0] === 'capacity') {
      const index = currentIdArray.indexOf(currentCapacity);
      if (index !== -1) {
        currentIdArray[index] = input[1].toLowerCase();
      }
    }

    const newID = currentIdArray.join('-')
    const newClickedProduct = products.find((item: LimitedProduct) => item.itemId === newID)
    console.log(newID);
    setClickedProduct(newClickedProduct)
  };




/* const currentName = productDetails.id.toLowerCase();
const currentCapacity = productDetails.capacity.toLowerCase()
const cutIndex = currentName.indexOf(currentCapacity)
const cutIndex2 = currentName.lastIndexOf("-")
const newItemId = currentName.slice(0, cutIndex).toLowerCase() + capacity.toLowerCase() + '-' + currentName.slice(cutIndex2+1,currentName.length);
const newClikedProduct = products.find(item => item.itemId === newItemId )
console.log(clickedProduct.itemId, newItemId )
setClickedProduct(newClikedProduct) */


/* apple-iphone-14-128gb-midnigh256gb-midnight */

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
                    onClick={()=>handleChange(['color',color])}
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
                onClick={()=>handleChange(['capacity',capacity])}
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

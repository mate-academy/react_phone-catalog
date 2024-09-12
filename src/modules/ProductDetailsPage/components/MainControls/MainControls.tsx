import React, { useEffect } from 'react';
import styles from './MainControls.module.scss';
import { ActionButtons } from '../../../../components/ActionButtons';
import { useAppContext } from '../../../../context/AppContext';
import { useLocation, useHistory } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { LimitedProduct } from '../../../../types/Product';

type MainControlsProps = {
  dynamicColor: string;
  setDynamicColor: (details: string) => void;
  dynamicCapacity: string;
  setDynamicCapacity: (details: string) => void;
};

export const MainControls: React.FC<MainControlsProps> = () => {
  const { clickedProduct, setClickedProduct, productDetails, products, previousCurrentPage, colors } = useAppContext();

  useEffect(() => {
    if (clickedProduct) {
      localStorage.setItem('clickedProduct', JSON.stringify(clickedProduct));
    }
  }, [clickedProduct]);

  useEffect(() => {
    const storedProduct = localStorage.getItem('clickedProduct');
    if (storedProduct) {
      setClickedProduct(JSON.parse(storedProduct));
    }
  }, [setClickedProduct]);

  const history = useHistory();
  const location = useLocation();

  const handleCapacity = (capacity: string) => {
    let currentUrl = `${location.pathname}`;
    let currentUrlArray = currentUrl.split("-");
    let newUrlArray = [...currentUrlArray];
    let newUrl: string;

    newUrlArray[newUrlArray.length - 2] = capacity.toLowerCase();
    newUrl = newUrlArray.join("-");
    history.push(newUrl);

    if (clickedProduct === undefined) {
      const newClickedProduct = products.find((item: LimitedProduct) => item.itemId === previousCurrentPage[1].slice(9, newUrl.length));
      setClickedProduct(newClickedProduct);
    } else {
      const newClickedProduct = products.find((item: LimitedProduct) => item.itemId === newUrl.slice(9, newUrl.length));
      setClickedProduct(newClickedProduct);
    }
  };

  const handleColor = (color: string) => {
    let currentUrl = `${location.pathname}`;
    let currentUrlArray = currentUrl.split("-");
    let newUrlArray = [...currentUrlArray];
    let newUrl: string;

    newUrlArray[newUrlArray.length - 1] = color.toLowerCase();
    newUrl = newUrlArray.join("-");
    history.push(newUrl);

    if (clickedProduct === undefined) {
      const newClickedProduct = products.find((item: LimitedProduct) => item.itemId === previousCurrentPage[1].slice(9, newUrl.length));
      setClickedProduct(newClickedProduct);
    } else {
      const newClickedProduct = products.find((item: LimitedProduct) => item.itemId === newUrl.slice(9, newUrl.length));
      setClickedProduct(newClickedProduct);
    }
  };

  if (productDetails) {
    return (
      <div className={styles.mainControls}>
        <div className={styles.selector}>
          <p className={styles.label}>Available colors</p>
          <div className={styles.buttons}>
            {productDetails.colorsAvailable.map((color: string) => (
              <div className={styles.colorButtonContainer} key={color}>
                <button
                  className={`${styles.colorButton} ${color === clickedProduct?.color ? styles.activeColorsAvailable : ""}`}
                  style={{ backgroundColor: colors[color] }}
                  onClick={() => handleColor(color)}
                />
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
                className={`${styles.capacityButton} ${clickedProduct?.capacity === capacity ? styles.active : ""}`}
                key={capacity}
                onClick={() => handleCapacity(capacity)}
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.price}>
          <div className={styles.hotPrice}>
            ${`${productDetails.priceDiscount}`}
          </div>
          <div className={styles.existPrice}>
            ${`${productDetails.priceRegular}`}
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

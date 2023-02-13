/* eslint-disable consistent-return */
import './ProductAvaliableColors.scss';
import { useContext } from 'react';
import { Colors, colorsHex } from '../../../../../../../../../colorDictinary';
import {
  DetailedProductContext,
} from '../../../../../../../../../context/DetailedProductContext';

export const ProductAvaliableColors = ({
  products,
} : any) => {
  const {
    detailedProduct, setDetailedProduct,
  } = useContext<any>(DetailedProductContext);

  const isActive = (color: string) => color === detailedProduct.color;
  const searchProductByColor = async (color: string) => {
    const newProduct = products.find((one: any) => {
      return one.phoneId
      === detailedProduct.id.replace(detailedProduct.color, color);
    });

    const response = await fetch(
      `new/products/${newProduct.itemId}.json`,
      {
        method: 'GET',
      },
    );

    if (response.status === 200) {
      const result = await response.json();

      window.history.replaceState(null, '', `/phones/${newProduct.id}`);

      return setDetailedProduct(result);
    }

    window.history.replaceState(null, '', `/product/${newProduct.id}`);
  };

  return (
    <div className="avaliable-colors body12">
      <p>
        Avaliable colors
      </p>
      <ul className="avaliable-colors__list">
        {
          detailedProduct.colorsAvailable.map((one: string) => {
            return (
              <li
                className={`avaliable-colors__item ${isActive(one) && 'active-color'}`}
                key={one}
                style={{
                  backgroundColor: colorsHex[one as keyof Colors],
                }}
                onClick={() => {
                  searchProductByColor(one);
                }}
                aria-hidden="true"
              />
            );
          })
        }
      </ul>
      <div className="horizontal-line" />
    </div>
  );
};

/* eslint-disable consistent-return */
import { useContext } from 'react';
import './ProductCapacity.scss';
import {
  DetailedProductContext,
} from '../../../../../../../../../context/DetailedProductContext';
import { Product } from '../../../../../../../../../types/types';

type Props = {
  products: Product[],
};

export const ProductCapacity:React.FC<Props> = (
  { products },
) => {
  const {
    detailedProduct,
    setDetailedProduct,
  } = useContext<any>(DetailedProductContext);
  const isActive = (capacity: string) => capacity === detailedProduct.capacity;
  const searchProductByCapacity = async (capacity: string) => {
    const newProduct = products.find((one: Product) => {
      return (
        one.phoneId
        === detailedProduct.id.replace(detailedProduct.capacity.toLowerCase(),
          capacity.toLowerCase()));
    });

    if (newProduct) {
      const response = await fetch(
        `new/products/${newProduct.itemId}.json`,
        {
          method: 'GET',
        },
      );

      if (response.status === 200) {
        const result = await response.json();

        // window.history.replaceState(null, '', `#/phones/${newProduct.id}`);

        return setDetailedProduct(result);
      }
    }

    setDetailedProduct(newProduct);
  };

  return (
    <div className="capacity">
      <div className="capacity__text body 12">
        Select capacity
      </div>
      <ul className="capacity__list">
        {
          detailedProduct.capacityAvailable.map((one: string) => {
            return (
              <li
                className={`capacity__item ${isActive(one) && 'active-button'}`}
                key={one}
                onClick={() => {
                  searchProductByCapacity(one);
                }}
                aria-hidden="true"
              >
                {one}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

import { Product } from '../../../types/Product';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CapacityAvailable.scss';
import { ProductContext } from '../../../store/ProductContext';
import {
  getDetailedAccessories,
  getDetailedPhones,
  getDetailedTablets,
} from '../../../api/DetailedProduct';
import classNames from 'classnames';

type Props = {
  selectedProduct: Product;
};

export const CapacityAvailable: React.FC<Props> = ({ selectedProduct }) => {
  const { onSelectedProduct, onSelectedImg } = useContext(ProductContext);
  const [capacityGB, setCapacityGB] = useState('');
  const navigate = useNavigate();

  const handleClickLink = useCallback(
    (capacity: string) => {
      let newId = '';

      selectedProduct.id.split('-').forEach(item => {
        if (
          item.includes('gb') ||
          item.includes('tb') ||
          (item.includes('mm') && capacity !== item)
        ) {
          newId += capacity.toLowerCase() + '-';
        } else {
          newId += item + '-';
        }
      });

      newId = newId.slice(0, -1);

      setCapacityGB(newId);
    },
    [selectedProduct.id],
  );

  useEffect(() => {
    const getProductProps = async () => {
      const detailedPhones = await getDetailedPhones();
      const detailedTablets = await getDetailedTablets();
      const detailedAccessories = await getDetailedAccessories();

      const newPhone = detailedPhones.find(phone => phone.id === capacityGB);

      const newTablet = detailedTablets.find(
        tablet => tablet.id === capacityGB,
      );

      const newAccessories = detailedAccessories.find(
        accessory => accessory.id === capacityGB,
      );

      if (newPhone) {
        onSelectedProduct(newPhone);
        onSelectedImg('');
        navigate(`/phones/${capacityGB}`);
      }

      if (newTablet) {
        onSelectedProduct(newTablet);
        onSelectedImg('');
        navigate(`/tablets/${capacityGB}`);
      }

      if (newAccessories) {
        onSelectedProduct(newAccessories);
        onSelectedImg('');
        navigate(`/accessories/${capacityGB}`);
      }
    };

    getProductProps();
  }, [capacityGB]);

  return (
    <>
      <div className="capacity">
        {selectedProduct.category.includes('accessories') ? (
          <p className="capacity__text">Select size</p>
        ) : (
          <p className="capacity__text">Select capacity</p>
        )}
        <div className="capacity__container">
          {selectedProduct.capacityAvailable.map(capacity => {
            return (
              <React.Fragment key={`capacity${capacity}`}>
                <Link
                  onClick={() => handleClickLink(capacity)}
                  className={classNames('capacity__box', {
                    'capacity__box--active':
                      capacity === selectedProduct.capacity,
                  })}
                  to={`.`}
                  key={capacity}
                >
                  <p className="capacity__box--text">{capacity}</p>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

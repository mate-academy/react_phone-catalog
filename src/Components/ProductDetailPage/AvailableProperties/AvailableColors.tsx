import { Colors } from '../../../utils/Colors';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Product } from '../../../types/Product';
import './AvailiableColors.scss';
import {
  getDetailedAccessories,
  getDetailedPhones,
  getDetailedTablets,
} from '../../../api/DetailedProduct';
import { ProductContext } from '../../../store/ProductContext';
import classNames from 'classnames';

type Props = {
  selectedProduct: Product;
  property?: string;
};

export const AvailableColors: React.FC<Props> = ({ selectedProduct }) => {
  const [newId, setNewId] = useState('');
  const { onSelectedProduct, onSelectedImg } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleColorClick = useCallback(
    (color: string) => {
      const newColor = color.split(' ').join('-');
      let result;

      if (selectedProduct.color.split(' ').length > 1) {
        result = selectedProduct.id.split('-').slice(0, -2);
      } else {
        result = selectedProduct.id.split('-').slice(0, -1);
      }

      const id = result.join('-') + `-${newColor}`;

      setNewId(id);
    },
    [selectedProduct.id],
  );

  useEffect(() => {
    const getProducts = async () => {
      const detailedPhones = await getDetailedPhones();
      const detailedTablets = await getDetailedTablets();
      const detailedAccessories = await getDetailedAccessories();
      const newPhone = detailedPhones.find(phone => phone.id === newId);
      const newTablet = detailedTablets.find(tablet => tablet.id === newId);
      const newAccessories = detailedAccessories.find(
        accessory => accessory.id === newId,
      );

      if (newPhone) {
        onSelectedProduct(newPhone);
        onSelectedImg('');
        navigate(`/phones/${newId}`);
      }

      if (newTablet) {
        onSelectedProduct(newTablet);
        onSelectedImg('');
        navigate(`/tablets/${newId}`);
      }

      if (newAccessories) {
        onSelectedProduct(newAccessories);
        onSelectedImg('');
        navigate(`/accessories/${newId}`);
      }
    };

    getProducts();
  }, [newId]);

  return (
    <div className="available">
      {selectedProduct.colorsAvailable.map(element => {
        const backGroundColor = Colors[element];

        return (
          <React.Fragment key={`color${element}`}>
            <div
              className={classNames('available__color', {
                'available__color--active': element === selectedProduct.color,
              })}
            >
              <NavLink to={'.'} onClick={() => handleColorClick(element)}>
                <div
                  className={'available__color--item'}
                  style={{ backgroundColor: `${backGroundColor}` }}
                ></div>
              </NavLink>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

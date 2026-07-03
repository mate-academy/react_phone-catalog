//#region imports
import React, { useCallback } from 'react';
import { renderColorItem } from './components/ColorItem/ColorItem';
import { renderCapacityItem } from './components/CapacityItem/CapacityItem';
import { ParamSelector } from '../ParamSelector';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getNewId } from './services/getNewId';
import { ProductDetails } from '../../../shared/types/ProductDetails';
import baseStyles from './base.module.scss';
//#endregion

type Props = {
  productDetails: ProductDetails;
};

export const ProductOptions: React.FC<Props> = ({ productDetails }) => {
  const { color, colorsAvailable, capacityAvailable, capacity, namespaceId } =
    productDetails;

  const { t } = useTranslation('productDetails');

  const navigate = useNavigate();

  const changeColor = useCallback(
    (newColor: string) => {
      const newID = getNewId(namespaceId, capacity, newColor);

      navigate(`/product/${newID}`);
    },
    [namespaceId, capacity, navigate],
  );

  const changeCapacity = useCallback(
    (newCapacity: string) => {
      const newID = getNewId(namespaceId, newCapacity, color);

      navigate(`/product/${newID}`);
    },
    [namespaceId, color, navigate],
  );

  return (
    <div className={baseStyles.productOptions}>
      <ParamSelector
        title={t('availableColors')}
        name="color"
        params={colorsAvailable}
        selected={color}
        renderItem={renderColorItem}
        changeParam={changeColor}
      />

      <ParamSelector
        title={t('selectCapacity')}
        name="capacity"
        params={capacityAvailable}
        selected={capacity}
        renderItem={renderCapacityItem}
        changeParam={changeCapacity}
      />
    </div>
  );
};

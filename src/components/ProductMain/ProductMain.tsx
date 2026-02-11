import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { colors } from '../../utils/colors';

import { ProductSpecs } from '../../types/ProductSpecs';
import { Product } from '../../types/Product';
import { getProductDetails } from '../../api/products';

import { StatesContext } from '../../base/store/GlobalStateProvider';
import { Line } from '../../base/Line/Line';
import { Price } from '../../base/Price/Price';
import { CardButtons } from '../../base/CardButton/CardButton';
import { SpecsMini } from '../../base/SpecsMini/SpecsMini';
import './ProductMain.scss';

export const ProductDetailsMain: React.FC = () => {
  const { selectedProduct } = useContext(StatesContext);
  const navigate = useNavigate();

  const [details, setDetails] = useState<ProductSpecs | null>(null);

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    getProductDetails(selectedProduct.id).then((data: ProductSpecs) => {
      setDetails(data);
    });
  }, [selectedProduct]);

  if (!selectedProduct) {
    return <div>No selected product</div>;
  }

  if (!details) {
    return <div>Loading...</div>;
  }

  const availableColors = details.colorsAvailable || [];
  const capacities = details.capacityAvailable || [];

  const changeProduct = (newColor?: string, newCapacity?: string) => {
    const color = newColor || details.color;
    const capacity = newCapacity || details.capacity;

    // Pega tudo antes da capacidade e cor atuais
    const parts = details.id.split('-');

    // Remove os dois últimos pedaços (capacidade e cor)
    const baseId = parts.slice(0, parts.length - 2).join('-');

    const newId = `${baseId}-${capacity.toLowerCase()}-${color.toLowerCase()}`;

    navigate(`/${selectedProduct.categoryId}/${newId}`);
  };

  const productForComponents: Product = {
    id: details.id,
    name: details.name,
    categoryId: selectedProduct.categoryId || 'phones',
    fullPrice: details.priceRegular,
    price: details.priceDiscount,
    discountPrice: details.priceDiscount,
    images: details.images || [],
    screen: details.screen,
    capacity: details.capacity,
    ram: details.ram,
  };

  return (
    <div className="productDetailsMain">
      {availableColors.length > 0 && (
        <>
          <div className="productDetailsMain__colors">
            <span className="productDetailsMain__colors-text">
              Available colors
            </span>

            <div className="productDetailsMain__colors-button-container">
              {availableColors.map((colorName, i) => {
                const colorHex = colors[colorName.toLowerCase()];

                return (
                  <button
                    className={cn('productDetailsMain__colors-button-bg', {
                      'productDetailsMain__colors-button-bg--selected':
                        colorName.toLowerCase() ===
                        details.color?.toLowerCase(),
                    })}
                    key={i + colorName}
                    onClick={() => changeProduct(colorName.toLowerCase())}
                  >
                    <div
                      className="productDetailsMain__colors-button"
                      style={{ backgroundColor: colorHex || '#CCCCCC' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <Line />
        </>
      )}

      {capacities.length > 0 && (
        <>
          <div className="productDetailsMain__capacity">
            <span className="productDetailsMain__capacity-text">
              Select capacity
            </span>

            <div className="productDetailsMain__capacity-container">
              {capacities.map((c, i) => (
                <button
                  key={c + i}
                  className={cn('productDetailsMain__capacity-button', {
                    'productDetailsMain__capacity-button--selected':
                      c === details.capacity,
                  })}
                  onClick={() => changeProduct(undefined, c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <Line />
        </>
      )}

      <div className="productDetailsMain__price">
        <Price product={productForComponents} />
        <CardButtons product={productForComponents} />
      </div>

      <SpecsMini product={productForComponents} />
    </div>
  );
};

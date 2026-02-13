import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { colors } from '../../utils/colors';

import { ProductSpecs } from '../../types/ProductSpecs';
import { Product } from '../../types/Product';
import { getProductDetails } from '../../api/products';

import { Line } from '../../base/Line/Line';
import { Price } from '../../base/Price/Price';
import { CardButtons } from '../../base/CardButton/CardButton';
import { SpecsMini } from '../../base/SpecsMini/SpecsMini';

import './ProductMain.scss';

export const ProductDetailsMain: React.FC = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams();

  const [details, setDetails] = useState<ProductSpecs | null>(null);

  useEffect(() => {
    if (!productId) {
      return;
    }

    getProductDetails(productId, category).then((data: ProductSpecs) => {
      setDetails(data);
    });
  }, [productId, category]);

  if (!productId) {
    return <div>No product found</div>;
  }

  if (!details) {
    return <div>Loading...</div>;
  }

  const availableColors = details.colorsAvailable || [];
  const capacities = details.capacityAvailable || [];

  const changeProduct = (newColor?: string, newCapacity?: string) => {
    const color = newColor || details.color;
    const capacity = newCapacity || details.capacity;

    const newId = `${details.namespaceId}-${capacity.toLowerCase()}-${color.toLowerCase()}`;

    navigate(`/${category}/${newId}`);
  };

  const productForComponents: Product = {
    id: details.id,
    name: details.name,
    categoryId: details.category,
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
              {availableColors.map(colorName => {
                const colorHex = colors[colorName.toLowerCase()];

                return (
                  <button
                    key={colorName}
                    className={cn('productDetailsMain__colors-button-bg', {
                      'productDetailsMain__colors-button-bg--selected':
                        colorName.toLowerCase() === details.color.toLowerCase(),
                    })}
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
              {capacities.map(capacity => (
                <button
                  key={capacity}
                  className={cn('productDetailsMain__capacity-button', {
                    'productDetailsMain__capacity-button--selected':
                      capacity === details.capacity,
                  })}
                  onClick={() => changeProduct(undefined, capacity)}
                >
                  {capacity}
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

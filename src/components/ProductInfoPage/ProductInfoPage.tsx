import './productInfoPage.scss';
import { useParams } from 'react-router-dom';
import { BreadcrumbsNav } from '../BreadcrumbsNav';
import { useEffect, useState } from 'react';

import cn from 'classnames';

import { PhoneInfoType } from '../../types/PhoneInfoType';
import { TabletInfoType } from '../../types/TabletInfoType';
import { AccessoryInfoType } from '../../types/AccessoryInfoType';
import { AllProductsType } from '../../types/AllProductsType';

export type ProductInfoUnionType =
  | PhoneInfoType
  | TabletInfoType
  | AccessoryInfoType;

export const ProductInfoPage: React.FC = () => {
  const [foundItem, setFoundItem] = useState<ProductInfoUnionType | null>(null);

  const [foundProduct, setFoundProduct] = useState<AllProductsType | null>(
    null,
  );

  const [foundId, setFoundId] = useState(null);

  const [mainPhoto, setMainPhoto] = useState<string | undefined>(undefined);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    foundItem?.color || null,
  );

  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(
    foundItem?.capacity || null,
  );

  // const [showDiscount, setShowDiscount] = useState<boolean | null>(
  //   foundItem.,
  // );

  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();

  const colorMap: Record<string, string> = {
    rosegold: '#B76E79',
    midnightgreen: '#4e5851',
    sierrablue: '#9BB5CE',
    spaceblack: '#1F1F1F',
    // midnight: 'black',
  };

  const DEFAULT_COLOR = 'gray';

  const getSafeColor = (color: string): string => {
    const lowerColor = color.toLowerCase();

    if (CSS.supports('color', lowerColor)) {
      return lowerColor;
    }

    if (colorMap[lowerColor]) {
      return colorMap[lowerColor];
    }

    return DEFAULT_COLOR;
  };

  useEffect(() => {
    fetch(`/api/${category}.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(
          (product: ProductInfoUnionType) => product.id === itemId,
        );

        setFoundItem(found);
        setMainPhoto(found?.images[0]);
        setSelectedColor(found?.color);
        setSelectedCapacity(found?.capacity);
      });
  }, [category, itemId]);

  console.log('-----selectedCapacity-----', selectedCapacity);

  useEffect(() => {
    fetch(`/api/products.json`)
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(
          (product: AllProductsType) => product.itemId === itemId,
        );

        setFoundId(foundProduct.id);
        setFoundProduct(foundProduct);
      });
  }, [itemId]);

  const modelName = foundItem?.name;
  const modelPhoto = foundItem?.images;

  return (
    <div className="product-info-page">
      <BreadcrumbsNav />

      <h2 className="full-name">{modelName}</h2>

      <div className="modelsPhoto">
        <div className="mainPhoto">
          <img className="main-img" src={mainPhoto} alt="main photo" />
        </div>

        <div className="smallPhoto-container">
          {modelPhoto?.map((photo, index) => (
            <div
              key={index}
              className={cn('smallPhoto-box', {
                'is-active': mainPhoto === photo,
              })}
            >
              <img
                src={`/${photo}`}
                alt={`Product thumbnail ${index + 1}`}
                onClick={() => setMainPhoto(photo)}
                className="mini-img"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="main-controls">
        <div className="colors-id-box">
          <div className="colors-box">
            <p className="small-text-12-600">Available colors</p>

            <div className="models-colors">
              {foundItem?.colorsAvailable.map(color => {
                const safeColor = getSafeColor(color);

                return (
                  <div
                    key={color}
                    className={cn('border-color', {
                      'is-active': selectedColor === color,
                    })}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div
                      className="color"
                      style={{ backgroundColor: safeColor }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="id-box">
            <p className="small-text-12">ID: {foundId}</p>
          </div>
        </div>

        <div className="select-capacity-container">
          <div className="info-copacity-box">
            <p className="small-text-12-600">Select capacity</p>

            <div className="capacity-list">
              {foundItem?.capacityAvailable.map(capacity => {
                return (
                  <div
                    key={capacity}
                    // className="capacity"

                    className={cn('capacity', {
                      'is-active': selectedCapacity === capacity,
                    })}
                    onClick={() => setSelectedCapacity(capacity)}
                  >
                    <p className="main-body-text-14">{capacity}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="price-container">
          {foundProduct ? (
            foundProduct.year < 2021 ? (
              <>
                <div className="price">{foundProduct.price}</div>
                <div className="price old-price">{foundProduct.fullPrice}</div>
              </>
            ) : (
              <div className="price">{foundProduct.fullPrice}</div>
            )
          ) : null}
        </div>
      </div>

      {/* <div className='grey-line'></div> */}
    </div>
  );
};

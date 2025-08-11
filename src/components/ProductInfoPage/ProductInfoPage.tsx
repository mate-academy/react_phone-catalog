import './productInfoPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();

  const colorMap: Record<string, string> = {
    rosegold: '#B76E79',
    midnight: '#0A0B1D',
    midnightgreen: '#4E5851',
    sierrablue: '#9BB5CE',
    spacegray: '#4A4A4A',
    spaceblack: '#121212',
    champagne: '#F7E7CE',
    skyblueish: '#87CEEB',
  };

  const specs = [
    { name: 'Screen', value: foundItem?.screen },
    { name: 'Resolution', value: foundItem?.resolution },
    { name: 'Processor', value: foundItem?.processor },
    { name: 'RAM', value: foundItem?.ram },
  ];

  const DEFAULT_COLOR = 'gray';
  // const DEFAULT_COLOR = 'red';

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

        if (!found) {
          navigate('/product-not-found');
          return;
        }

        setFoundItem(found);
        setMainPhoto(found.images[0]);
        setSelectedColor(found.color);
        setSelectedCapacity(found.capacity);
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

        if (!foundProduct) {
          navigate('/product-not-found');
          return;
        }

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

      <div className="photo-control-box">
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
          <div className="text-container">
            <p className="small-text-12-600">Available colors</p>
            <p className="id-text-12">ID: {foundId}</p>
          </div>

          <div className="colors-id-box">
            <div className="container">
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

            <div className="select-capacity-container">
              <div className="info-copacity-box">
                <p className="small-text-12-600">Select capacity</p>

                <div className="capacity-list">
                  {foundItem?.capacityAvailable.map(capacity => {
                    return (
                      <div
                        key={capacity}
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
              {foundProduct &&
                (foundProduct.year < 2021 ? (
                  <>
                    <div className="price">${foundProduct.price}</div>
                    <div className="price old-price">${foundProduct.fullPrice}</div>
                  </>
                ) : (
                  <div className="price">${foundProduct.fullPrice}</div>
                ))}
            </div>

            <div className="add-favourites-container">
              <div className="add-button has-shadow-cursor">
                <p className="button-text">Add to card</p>
              </div>

              <div className="favourites-button has-shadow-cursor">
                <img
                  className="icon"
                  src="/img/icons/Heart.svg"
                  alt="favourites img"
                />
              </div>
            </div>

            <div className="info">
              {specs.map(({ name, value }) => (
                <div className="spec-name-value-box" key={name}>
                  <div className="spec-name">{name}</div>
                  <div className="spec-value">{value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

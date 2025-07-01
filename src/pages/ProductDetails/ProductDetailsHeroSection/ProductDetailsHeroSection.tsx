import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from './ProductDetailsHeroSection.module.scss';

import { ProductDetailsContext } from '@/context/ProductDetailsContext';
import { ProductContext, ProductContextType } from '@/context/ProductContext';

import { SwiperProductDetails } from '@/components/UI/SwiperProductDetails';
import { ProductPrice } from '@/components/UI/ProductPrice';
import { Loader } from '@/components/UI/Loader';
import { ProductCardButtons } from '@/components/UI/ProductCardButtons';

import { ProductDetails } from '@/types/productDetails';
import { ProductCharacteristics } from '@/components/UI/ProductCharacteristics';
import { ProductDescription } from '@/components/UI/ProductDescription';
import { ProductInfoAbout } from '@/components/UI/ProductInfoAbout';
import { useTranslation } from 'react-i18next';

// #region available product colors
const colorHexMap: { [key: string]: string } = {
  spacegray: '#5f5f5f',
  midnightgreen: '#004953',
  rosegold: '#B76E79',
  sierrablue: '#a4c4da',
  spaceblack: '#4b4845',
  midnight: '#343b43',
  graphite: '#4C4A46',
};
//#endregion

export const ProductDetailsHeroSection: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { t } = useTranslation();

  // #region productCharacteristics
  const characteristics: { key: keyof ProductDetails; name: string }[] = [
    { key: 'screen', name: 'screen' },
    { key: 'resolution', name: 'resolution' },
    { key: 'processor', name: 'processor' },
    { key: 'ram', name: 'ram' },
  ];
  //#endregion

  // #region productTechSpec
  const techSpec: { key: keyof ProductDetails; name: string }[] = [
    { key: 'screen', name: 'screen' },
    { key: 'resolution', name: 'resolution' },
    { key: 'processor', name: 'processor' },
    { key: 'ram', name: 'ram' },
    { key: 'capacity', name: 'builtInMemory' },
    { key: 'camera', name: 'camera' },
    { key: 'zoom', name: 'zoom' },
    { key: 'cell', name: 'cell' },
  ];
  //#endregion

  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const category =
    pathSegments.length >= 2
      ? pathSegments[pathSegments.length - 2]
      : undefined;

  const detailsContext = useContext(ProductDetailsContext);
  const productContext = useContext(ProductContext) as ProductContextType;

  if (!detailsContext || !productContext) {
    throw new Error(
      'ProductDetailsHeroSection must be used within necessary Providers',
    );
  }

  const { getProduct: getProductDetails } = detailsContext;
  const { allProducts, isLoading: productsLoading } = productContext;

  const productDetails = getProductDetails(category!, itemId!);

  const productFromList = useMemo(() => {
    if (!productDetails) {
      return undefined;
    }

    return allProducts.find(p => p.itemId === productDetails.id);
  }, [productDetails, allProducts]);

  // #region fakeItemId
  const [displayId, setDisplayId] = useState<number | null>(null);

  const getRandomSixDigitNumber = (): number => {
    return Math.floor(Math.random() * 900000) + 100000;
  };

  useEffect(() => {
    const randomId = getRandomSixDigitNumber();

    setDisplayId(randomId);
  }, [itemId]);
  //#endregion

  // #region product colors
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (productDetails) {
      setSelectedColor(productDetails.color);
    }
  }, [productDetails]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    const newItemId = `${productDetails?.namespaceId}-${productDetails?.capacity.toLowerCase()}-${newColor}`;
    const newPath = `/${category}/${newItemId}`;

    setSelectedColor(newColor);
    navigate(newPath);
  };
  //#endregion

  // #region product capacity
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  useEffect(() => {
    if (productDetails) {
      setSelectedCapacity(productDetails.capacity);
    }
  }, [productDetails]);

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCapacity = event.target.value;
    const newItemId = `${productDetails?.namespaceId}-${newCapacity.toLowerCase()}-${productDetails?.color}`;
    const newPath = `/${category}/${newItemId}`;

    setSelectedCapacity(newCapacity);
    navigate(newPath);
  };
  //#endregion

  if (productsLoading || !productDetails || !productFromList) {
    return (
      <div className={styles.centeredLoader}>
        <Loader />
      </div>
    );
  }

  //#region translation
  const translatedName = t(
    `products.${productDetails.id}.name`,
    productDetails.name,
  );
  //#endregion

  return (
    <div className={styles.page}>
      <div className={styles.productWrapper}>
        <h2 className={styles.productName}>{translatedName}</h2>

        <div className={styles.swiperContainer}>
          <SwiperProductDetails images={productDetails.images} />
        </div>

        <div className={styles.productCharacteristicBlock}>
          <div className={styles.productColors}>
            <div className={styles.colorInfo}>
              <p className={styles.titleColors}>Available colors</p>
              <p className={styles.productId}>{`ID: ${displayId}`}</p>
            </div>
            <div className={styles.colorSelector}>
              {productDetails.colorsAvailable &&
                productDetails.colorsAvailable.map(color => {
                  const inputId = `color-${productDetails.id}-${color}`;
                  const backgroundColor = colorHexMap[color] || color;

                  return (
                    <div key={color} className={styles.colorOption}>
                      <input
                        type="radio"
                        name="productColor"
                        id={inputId}
                        value={color}
                        checked={selectedColor === color}
                        onChange={handleColorChange}
                        className={styles.colorRadioInput}
                      />
                      <label
                        htmlFor={inputId}
                        className={styles.colorLabel}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      >
                        <span
                          className={styles.colorSwatch}
                          style={{ backgroundColor: backgroundColor }}
                        ></span>
                        <span className="visually-hidden">{color}</span>
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className={styles.productCapacity}>
            <p className={styles.titleCapacity}>Select capacity</p>
            <div className={styles.capacitySelector}>
              {productDetails.capacityAvailable &&
                productDetails.capacityAvailable.map(capacity => {
                  const inputId = `capacity-${productDetails.id}-${capacity}`;

                  return (
                    <div key={capacity} className={styles.capacityOption}>
                      <input
                        type="radio"
                        name="productCapacity"
                        id={inputId}
                        value={capacity}
                        checked={selectedCapacity === capacity}
                        onChange={handleCapacityChange}
                        className={styles.capacityRadioInput}
                      />
                      <label htmlFor={inputId} className={styles.capacityLabel}>
                        {capacity}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className={styles.productPriceWrapper}>
            {productFromList ? (
              <ProductPrice
                isShowFullPrice={true}
                product={productFromList}
                customClassName={styles.productPricesParentStyles}
              />
            ) : (
              <Loader />
            )}
          </div>

          <div className={styles.productCardButtonsWrapper}>
            <ProductCardButtons product={productFromList} />
          </div>

          <ProductCharacteristics
            product={productDetails}
            characteristics={characteristics}
            customClassNameContainer={
              styles.productCharacteristicsParentContainerCustom
            }
          />
        </div>

        <div className={styles.descriptionAboutContainer}>
          <ProductDescription articleName={t('description.about')}>
            <ProductInfoAbout product={productDetails} />
          </ProductDescription>
        </div>
        <div className={styles.descriptionTechSpecsContainer}>
          <ProductDescription
            articleName={t('description.techSpecs')}
            customClassName={styles.productDescriptionParentCustomName}
          >
            <ProductCharacteristics
              product={productDetails}
              characteristics={techSpec}
              customClassNameContainer={
                styles.productCharacteristicsParentContainerCustom
              }
              customClassNameForName={styles.productCharacteristicsNameCustom}
              customClassNameForValue={styles.productCharacteristicsValueCustom}
            />
          </ProductDescription>
        </div>
      </div>
    </div>
  );
};

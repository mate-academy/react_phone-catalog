/* eslint-disable @typescript-eslint/indent */
import styles from './ProductInfoPage.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useProductFilters } from '../../components/hooks/useProductFilters';

import { LocationNav } from '../../LocationNav';
import { PhoneInfoType } from '../../types/PhoneInfoType';
import { TabletInfoType } from '../../types/TabletInfoType';
import { AccessoryInfoType } from '../../types/AccessoryInfoType';
import { AllProductsType } from '../../types/AllProductsType';
import { SwiperSection } from '../../components/SwiperSection';
import { FavoritesAddButton } from '../../components/FavoritesAddButton';

export type ProductInfoUnionType =
  | PhoneInfoType
  | TabletInfoType
  | AccessoryInfoType;

export const ProductInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { getLastSearch } = useProductFilters();

  const [foundItem, setFoundItem] = useState<ProductInfoUnionType | null>(null);
  const [foundProduct, setFoundProduct] = useState<AllProductsType | null>(
    null,
  );
  const [discountedProducts, setDiscountedProducts] = useState<
    AllProductsType[]
  >([]);
  const [mainPhoto, setMainPhoto] = useState<string | undefined>(undefined);

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

  const getSafeColor = (color: string): string => {
    const DEFAULT_COLOR = 'gray';
    const lowerColor = color.toLowerCase();

    if (CSS.supports('color', lowerColor)) {
      return lowerColor;
    }

    return colorMap[lowerColor] || DEFAULT_COLOR;
  };

  useEffect(() => {
    if (!category || !itemId) {
      return;
    }

    Promise.all([
      fetch(`api/${category}.json`).then(res => res.json()),
      fetch(`api/products.json`).then(res => res.json()),
    ])
      .then(([categoryData, productsData]) => {
        const fItem = categoryData.find(
          (product: ProductInfoUnionType) => product.id === itemId,
        );
        const fProduct = productsData.find(
          (product: AllProductsType) => product.itemId === itemId,
        );

        const dProducts = productsData
          .filter((product: AllProductsType) => product.year < 2022)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        if (!fItem || !fProduct) {
          navigate('/product-not-found');

          return;
        }

        setFoundItem(fItem);
        setFoundProduct(fProduct);
        setDiscountedProducts(dProducts);
        setMainPhoto(fItem.images[0]);
      })
      .catch(() => {
        navigate('/product-not-found');
      });
  }, [itemId, navigate, category]);

  if (!foundItem || !foundProduct) {
    return null;
  }

  const baseSpecifications = [
    { name: 'Screen', value: foundItem.screen },
    { name: 'Resolution', value: foundItem.resolution },
    { name: 'Processor', value: foundItem.processor },
    { name: 'RAM', value: foundItem.ram },
  ];

  const fullSpecifications = [
    ...baseSpecifications,
    ...(foundItem.category === 'phones' || foundItem.category === 'tablets'
      ? [
          { name: 'Built in memory', value: foundItem.capacity },
          { name: 'Camera', value: foundItem.camera },
          { name: 'Zoom', value: foundItem.zoom },
          { name: 'Cell', value: foundItem.cell.join(', ') },
        ]
      : [{ name: 'Cell', value: foundItem.cell.join(', ') }]),
  ];

  const foundId = foundProduct.id;
  const modelYear = foundProduct.year;
  const modelName = foundItem.name;
  const modelPhoto = foundItem.images;
  const selectedCapacity = foundItem.capacity.toLowerCase();
  const selectedColor = foundItem.color.split(' ').join('-').toLowerCase();
  const modelPrefix = foundItem.namespaceId;

  return (
    <>
      <div className={styles.productInfoPage}>
        <LocationNav />

        <h2 className={styles.fullName}>{modelName}</h2>

        <div className={styles.photoControlBox}>
          <div className={styles.modelsPhoto}>
            <div className={styles.mainPhoto}>
              <img
                className={styles.mainImg}
                src={mainPhoto}
                alt="main photo"
              />
            </div>

            <div className={styles.smallPhotoContainer}>
              {modelPhoto.map((photo, index) => (
                <div
                  key={index}
                  className={cn(styles.smallPhotoBox, {
                    [styles.isActive]: mainPhoto === photo,
                  })}
                >
                  <img
                    src={photo}
                    alt={`Product thumbnail ${index + 1}`}
                    onClick={() => setMainPhoto(photo)}
                    className={styles.miniImg}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mainControls}>
            <div className={styles.textContainer}>
              <p className={styles.smallText}>Available colors</p>
              <p className={styles.idText}>ID: {foundId}</p>
            </div>

            <div className={styles.colorsIdBox}>
              <div className={styles.container}>
                <div className={styles.modelsColors}>
                  {foundItem.colorsAvailable.map(color => {
                    const normalizedColor = color
                      .split(' ')
                      .join('-')
                      .toLowerCase();
                    const safeColor = getSafeColor(normalizedColor);
                    const newItemId = `${modelPrefix}-${selectedCapacity}-${normalizedColor}`;
                    const newLink = `/${category}/${newItemId}${getLastSearch()}`;

                    return (
                      <Link
                        to={newLink}
                        key={newLink}
                        className={cn(styles.borderColor, {
                          [styles.isActive]: selectedColor === normalizedColor,
                        })}
                      >
                        <div
                          className={styles.color}
                          style={{ backgroundColor: safeColor }}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className={styles.selectCapacityContainer}>
                <div className={styles.infoCopacityBox}>
                  <p className={styles.smallText}>Select capacity</p>
                  <div className={styles.capacityList}>
                    {foundItem.capacityAvailable.map(capacity => {
                      const normalizedCapacity = capacity.toLowerCase();
                      const newItemId = `${modelPrefix}-${normalizedCapacity}-${selectedColor}`;
                      const newLink = `/${category}/${newItemId}${getLastSearch()}`;

                      return (
                        <Link
                          to={newLink}
                          key={newLink}
                          className={cn(styles.capacity, {
                            [styles.isActive]:
                              selectedCapacity === normalizedCapacity,
                          })}
                        >
                          <p className={styles.mainBodyText}>{capacity}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.priceContainer}>
                {modelYear < 2021 ? (
                  <>
                    <div className={styles.price}>${foundProduct.price}</div>
                    <div className={cn(styles.price, styles.oldPrice)}>
                      ${foundProduct.fullPrice}
                    </div>
                  </>
                ) : (
                  <div className={styles.price}>${foundProduct.fullPrice}</div>
                )}
              </div>

              <FavoritesAddButton productId={foundId} />

              <div className={styles.info}>
                {baseSpecifications.map(({ name, value }) => (
                  <div className={styles.specNameValueBox} key={name}>
                    <div className={styles.specName}>{name}</div>
                    <div className={styles.specValue}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.aboutSection}>
          <div className={styles.aboutModel}>
            <h3 className={styles.boxTitle}>About</h3>
            {foundItem.description.map(({ title, text }) => (
              <div key={title} className={styles.descriptionBlock}>
                <h4 className={styles.titleDescription}>{title}</h4>
                {text.map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(styles.textDescription, styles.mainBodyText)}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.techSpecs}>
            <h3 className={styles.boxTitle}>Tech specs</h3>
            <div className={styles.infoDetailed}>
              {fullSpecifications.map(({ name, value }) => (
                <div className={styles.snValueBox} key={name}>
                  <p className={styles.mainBodyText}>{name}</p>
                  <p className={styles.mainBodyTextBlack}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SwiperSection
        title="You may also like"
        products={discountedProducts}
        showDiscount
      />
    </>
  );
};

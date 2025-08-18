import './productInfoPage.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useProductFilters } from '../../hooks/useProductFilters';

import { BreadcrumbsNav } from '../BreadcrumbsNav';
import { PhoneInfoType } from '../../types/PhoneInfoType';
import { TabletInfoType } from '../../types/TabletInfoType';
import { AccessoryInfoType } from '../../types/AccessoryInfoType';
import { AllProductsType } from '../../types/AllProductsType';
import { SwiperSection } from '../SwiperSection';
import { FavouritesAddButton } from '../FavouritesAddButton';

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

  // const [isLoading, setIsLoading] = useState(true);

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
    if (!category || !itemId) return;

    // setIsLoading(true);

    Promise.all([
      fetch(`/api/${category}.json`).then(res => res.json()),
      fetch(`/api/products.json`).then(res => res.json()),
    ])
      .then(([categoryData, productsData]) => {
        const foundItem = categoryData.find(
          (product: ProductInfoUnionType) => product.id === itemId,
        );

        const foundProduct = productsData.find(
          (product: AllProductsType) => product.itemId === itemId,
        );

        const discountedProducts = productsData
          .filter((product: AllProductsType) => product.year < 2022)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        if (!foundItem || !foundProduct) {
          navigate('/product-not-found');
          return;
        }

        // Задержка в 1 секунду для показа лоадера
        // setTimeout(() => {
        setFoundItem(foundItem);
        setFoundProduct(foundProduct);
        setDiscountedProducts(discountedProducts);
        setMainPhoto(foundItem.images[0]);
        // setIsLoading(false);
        // }, 200);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        navigate('/product-not-found');
      });
  }, [category, itemId]);

  // if (isLoading) {
  //   return <div>Loading...</div>; // или <Loader /> если есть компонент лоадера
  // }

  if (!foundItem || !foundProduct) {
    return null; // или <Loader />
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
      <div className="product-info-page">
        <BreadcrumbsNav />

        <h2 className="full-name">{modelName}</h2>

        <div className="photo-control-box">
          <div className="modelsPhoto">
            <div className="mainPhoto">
              <img className="main-img" src={mainPhoto} alt="main photo" />
            </div>

            <div className="smallPhoto-container">
              {modelPhoto.map((photo, index) => (
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
                        className={cn('border-color', {
                          'is-active': selectedColor === normalizedColor,
                        })}
                      >
                        <div
                          className="color"
                          style={{ backgroundColor: safeColor }}
                        ></div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="select-capacity-container">
                <div className="info-copacity-box">
                  <p className="small-text-12-600">Select capacity</p>

                  <div className="capacity-list">
                    {foundItem.capacityAvailable.map(capacity => {
                      const normalizedCapacity = capacity.toLowerCase();

                      const newItemId = `${modelPrefix}-${normalizedCapacity}-${selectedColor}`;
                      const newLink = `/${category}/${newItemId}${getLastSearch()}`;

                      return (
                        <Link
                          to={newLink}
                          key={newLink}
                          className={cn('capacity', {
                            'is-active':
                              selectedCapacity === normalizedCapacity,
                          })}
                        >
                          <p className="main-body-text-14">{capacity}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="price-container">
                {modelYear < 2021 ? (
                  <>
                    <div className="price">${foundProduct.price}</div>
                    <div className="price old-price">
                      ${foundProduct.fullPrice}
                    </div>
                  </>
                ) : (
                  <div className="price">${foundProduct.fullPrice}</div>
                )}
              </div>

              <FavouritesAddButton productId={foundId} />

              <div className="info">
                {baseSpecifications.map(({ name, value }) => (
                  <div className="spec-name-value-box" key={name}>
                    <div className="spec-name">{name}</div>
                    <div className="spec-value">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <div className="about-model">
            <h3 className="box-title">About</h3>

            {foundItem.description.map(({ title, text }) => (
              <div key={title} className="description-block">
                <h4 className="title-description">{title}</h4>
                {text.map((paragraph, index) => (
                  <p key={index} className="text-description main-body-text-14">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="tech-specs">
            <h3 className="box-title">Tech specs</h3>

            <div className="info">
              {fullSpecifications.map(({ name, value }) => {
                return (
                  <div className="spec-name-value-box" key={name}>
                    <p className="main-body-text-14">{name}</p>
                    <p className="main-body-text-14-black">{value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <SwiperSection
        title="You may also like"
        products={discountedProducts}
        showDiscount={true}
      />
    </>
  );
};

/* eslint-disable @typescript-eslint/indent */
/* eslint max-len: "off" */
import React, { useEffect, useState } from 'react';
import './ProductInfoPage.scss';
import { Breadcrumbs } from '../ProductsPage/Breadcrumbs';
import { ModelsSlider } from '../HomePage/ModelsSlider';
import { ProductsType } from '../../types/ProductsType';
import { PhonesType } from '../../types/PhonesType';
import { TabletsType } from '../../types/TabletsType';
import { AccessoriesType } from '../../types/AccessoriesType';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AddAndFavouritesButton } from '../HomePage/AddAndFavouritesButton';
import { useProductFilters } from '../../hooks/useProductsFilters';
import classNames from 'classnames';
import { SkeletonProductInfoPage } from '../../components/Skeletons/SkeletonProductInfoPage/SkeletonProductInfoPage';

export type ProductUnionType = PhonesType | TabletsType | AccessoriesType;

export const ProductInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { getLastSearch } = useProductFilters();
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();

  const [foundItem, setFoundItem] = useState<ProductUnionType | null>(null);
  const [foundProduct, setFoundProduct] = useState<ProductsType | null>(null);
  const [discountProducts, setDiscountProducts] = useState<ProductsType[]>([]);
  const [mainPhoto, setMainPhoto] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const colorMap: Record<string, string> = {
    white: 'rgba(255,255,255,1)',
    black: 'rgba(0,0,0,1)',
    red: 'rgba(255,59,48,1)',
    green: 'rgba(0,199,190,1)',
    yellow: 'rgba(238, 242, 10, 1)',
    blue: 'rgba(85, 156, 189, 1)',
    purple: 'rgba(209, 162, 233, 1)',
    pink: 'rgba(239, 159, 211, 1)',
    starlight: 'rgba(245,245,247,1)',
    spacegray: 'rgba(108, 103, 103, 1)',
    silver: 'rgba(199,199,204,1)',
    gold: 'rgba(255, 228, 207, 1)',
    rosegold: 'rgba(244, 185, 216, 1)',
    graphite: 'rgba(83,83,83,1)',
    pacificblue: 'rgba(25,133,221,1)',
    midnight: 'rgba(10,11,29,1)',
    midnightgreen: 'rgba(78,88,81,1)',
    sierrablue: 'rgba(155,181,206,1)',
    spaceblack: 'rgba(18,18,18,1)',
    champagne: 'rgba(247,231,206,1)',
    skyblue: 'rgba(135,206,235,1)',
    purpleblue: 'rgba(88,86,214,1)',
  };

  const colorNames: Record<string, string> = {
    white: 'White',
    black: 'Black',
    red: 'Red',
    green: 'Green',
    yellow: 'Yellow',
    blue: 'Blue',
    purple: 'Purple',
    pink: 'Pink',
    starlight: 'Starlight',
    spacegray: 'Space Gray',
    silver: 'Silver',
    gold: 'Gold',
    rosegold: 'Rosegold',
    graphite: 'Graphite',
    pacificblue: 'Pacific Blue',
    midnight: 'Midnight',
    midnightgreen: 'Midnight Green',
    sierrablue: 'Sierra Blue',
    spaceblack: 'Space Black',
    champagne: 'Champagne',
    skyblue: 'Sky Blue',
    purpleblue: 'Purple Blue',
  };

  const getColorName = (color: string): string => {
    return colorNames[color.toLowerCase()] || color;
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
        const foundedItem = categoryData.find(
          (product: ProductUnionType) => product.id === itemId,
        );

        const foundedProduct = productsData.find(
          (product: ProductsType) => product.itemId === itemId,
        );

        const discountedProduct = productsData
          .filter((product: ProductsType) => product.year < 2022)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        if (!foundedItem || !foundedProduct) {
          navigate('/product-not-found');

          return;
        }

        setFoundItem(foundedItem);
        setFoundProduct(foundedProduct);
        setDiscountProducts(discountedProduct);
        setMainPhoto(foundedItem.images[0]);
      })
      .catch(() => {
        navigate('/product-not-found');
      })
      .finally(() => {
        setIsInitialLoading(false);
        setIsLoading(false);
      });
  }, [itemId, navigate, category]);

  if (isInitialLoading) {
    return <SkeletonProductInfoPage />;
  }

  if (!foundItem || !foundProduct) {
    return null;
  }

  const baseSpecs = [
    { name: 'Screen', value: foundItem.screen },
    { name: 'Resolution', value: foundItem.resolution },
    { name: 'Processor', value: foundItem.processor },
    { name: 'RAM', value: foundItem.ram },
  ];

  const fullSpecs = [
    ...baseSpecs,
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
      <div className="productInfo">
        <Breadcrumbs />

        <h2 className="productInfo__title">{modelName}</h2>
        <div className="gallery">
          <div className="productInfo__gallery">
            <div className="productInfo__mainPhoto">
              <img
                src={mainPhoto}
                alt="Main Photo"
                className="productInfo__mainImg"
              />
            </div>
            <div className="productInfo__previewList">
              {modelPhoto.map((photo, index) => (
                <div
                  key={index}
                  className={classNames('productInfo__preview', {
                    'productInfo__preview--active': mainPhoto === photo,
                  })}
                >
                  <img
                    src={`${photo}`}
                    alt={`Preview ${index + 1}`}
                    className="productInfo__preview--img"
                    onClick={() => setMainPhoto(photo)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="productInfo__controls">
            <div className="productInfo__controls--text">
              <p className="controls-text">Available colors</p>
              <p className="controls-text">ID: {foundId}</p>
            </div>
            <div className="productInfo__colors">
              {foundItem.colorsAvailable.map(color => {
                const normalizedColor = color
                  .split(' ')
                  .join('-')
                  .toLowerCase();

                const displayName = getColorName(color);

                const newItemId = `${modelPrefix}-${selectedCapacity}-${normalizedColor}`;
                const newLink = `/${category}/${newItemId}${getLastSearch()}`;

                return (
                  <Link
                    key={newLink}
                    to={newLink}
                    className={classNames('productInfo__color', {
                      'productInfo__color--active':
                        selectedColor === normalizedColor,
                    })}
                    style={{
                      background:
                        colorMap[normalizedColor] || 'rgba(200,200,200,1)',
                    }}
                    title={displayName}
                  />
                );
              })}
            </div>

            <div className="productInfoLine"></div>

            <div className="productInfo__capacities">
              <div className="capacity">
                <p className="capacity__text">Select capacity</p>
                <div className="capacity__item">
                  {foundItem.capacityAvailable.map(capacity => {
                    const normalizedCapacity = capacity.toLowerCase();
                    const newItemId = `${modelPrefix}-${normalizedCapacity}-${selectedColor}`;
                    const newLink = `/${category}/${newItemId}${getLastSearch()}`;

                    return (
                      <Link
                        key={newLink}
                        to={newLink}
                        className={classNames('productInfo__capacity', {
                          'productInfo__capacity--active':
                            selectedCapacity === normalizedCapacity,
                        })}
                      >
                        <p className="productInfo__capacity--text">
                          {capacity}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="productInfoLine"></div>

            <div className="productInfo__price">
              {modelYear < 2021 ? (
                <>
                  <div className="productInfo__priceCurrent">
                    ${foundProduct.price}
                  </div>
                  <div className="productInfo__priceOld">
                    ${foundProduct.fullPrice}
                  </div>
                </>
              ) : (
                <div className="productInfo__priceCurrent">
                  ${foundProduct.fullPrice}
                </div>
              )}
            </div>

            <div className="productInfo__addButton">
              <AddAndFavouritesButton productId={foundId} />
            </div>

            <div className="productInfo__specs">
              {baseSpecs.map(({ name, value }) => (
                <div className="productInfo__spec" key={name}>
                  <div className="productInfo__spec--name">{name}</div>
                  <div className="productInfo__spec--value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="productInfo__about">
          <div className="about">
            <div className="about__block">
              <h3 className="productInfo__about--title">About</h3>

              <div className="productInfoLine"></div>

              {foundItem.description.map(
                ({ title, text }: { title: string; text: string[] }) => (
                  <div key={title} className="productInfo__description">
                    <h4 className="productInfo__description--title">{title}</h4>
                    {text.map((paragraph, index) => (
                      <p key={index} className="productInfo__description--text">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ),
              )}
            </div>

            <div className="productInfo__techSpecs">
              <h3 className="productInfo__techSpecs--title">Tech specs</h3>

              <div className="productInfoLine"></div>

              <div className="productInfo__specDetailed">
                {fullSpecs.map(({ name, value }) => {
                  return (
                    <div className="productInfo__specDetailedItem" key={name}>
                      <p className="productInfo__specDetailedItem--name">
                        {name}
                      </p>
                      <p className="productInfo__specDetailedItem--value">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModelsSlider
        title="You may also like"
        products={discountProducts}
        showDiscount={true}
        isSkeleton={isLoading}
      />
    </>
  );
};

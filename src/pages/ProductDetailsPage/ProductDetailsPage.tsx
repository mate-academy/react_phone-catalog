/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';

import {
  getProductById,
  getProducts,
  getProductsByCategory,
  sortNumericField,
  wait,
} from '../../utils';

import { ProductContext } from '../../context/ProductsContext';
import {
  Product,
  ProductCart,
  Colors,
  ProductCategories,
  ProductDetail,
  SpecificationsPhone,
  SpecificationsPhoneSimplified,
} from '../../types';

import { Slider, SliderItem, ProductCardSlider } from '../../ui/modules';
import {
  ButtonFavourite,
  ButtonAdd,
  ButtonBack,
  Specifications,
  Breadcrumb,
} from '../../ui/components';

import { Loader, Typography } from '../../ui/base';

import './ProductDetailsPage.scss';
import { useScrollToTop } from '../../hooks';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || '';

export const ProductDetailsPage: React.FC = () => {
  const [backToTop] = useScrollToTop();
  const { itemId } = useParams();
  const location = useLocation();
  const {
    favouriteItems,
    addDelProductFavourite,
    cartItems,
    addDelProductCart,
  } = useContext(ProductContext);
  const [productDetailed, setProductDetailed] = useState<ProductDetail>();
  const [productCategory, setProductCategory] = useState<ProductCategories>(
    ProductCategories.all,
  );
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [productsSameCapacity, setProductsSameCapacity] = useState<Product[]>(
    [],
  );
  const [productsSameColor, setProductsSameColor] = useState<Product[]>([]);
  const [productSameSeries, setProductSameSeries] = useState<Product[]>([]); // i.e iphone 11 pro with all colors and storages
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddingToFav, setIsAddingToFav] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isAddedToFav, setIsAddedToFav] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const getGroupKey = (item: Product) => {
    const productId = item.itemId;

    const simplifiedItem: Omit<Product, 'id'> = Object.keys(item).reduce(
      (obj: Omit<Product, 'id'>, key) => {
        if (key !== 'id') {
          // eslint-disable-next-line no-param-reassign
          obj[key] = item[key];
        }

        return obj;
      },
      {},
    );

    const keyGroup = productId
      .split('-')
      .filter(
        key =>
          !Object.values(simplifiedItem).find(
            keyVal =>
              String(keyVal).toLowerCase() === String(key).toLowerCase(),
          ),
      )
      .join('-');

    return keyGroup;
  };

  const getProductGropBySameStorage = (
    actualStorage: string,
    productSeries: Product[],
  ) => {
    return productSeries.filter(item => item.capacity === actualStorage);
  };

  const getProductGropBySameColor = (
    actualColor: string,
    productSeries: Product[],
  ) => {
    return productSeries.filter(item => item.color === actualColor);
  };

  const getColorHexByName = (colorName: string): string => {
    const indexOfKey = Object.keys(Colors).indexOf(colorName);

    return `${Object.values(Colors)[indexOfKey]}`;
  };

  const handleAddDelFav = () => {
    const currentItem = async () => {
      const allItems = await getProductsByCategory(productCategory);

      return allItems.find(item => item.itemId === itemId);
    };

    setIsAddingToFav(true);
    wait(100)
      .then(() => {
        currentItem()
          .then(result => {
            if (result) {
              addDelProductFavourite(result);
              setIsAddedToFav(currentStatus => !currentStatus);
            }
          })
          .catch(e => new Error(e));
      })
      .finally(() => setIsAddingToFav(false));
  };

  const handleAddDelCart = () => {
    const currentItem = async () => {
      const allItems = await getProductsByCategory(productCategory);

      return allItems.find(item => item.itemId === itemId);
    };

    setIsAddingToCart(true);
    wait(100)
      .then(() => {
        currentItem()
          .then(result => {
            if (result) {
              addDelProductCart(result as ProductCart);
              setIsAddedToCart(currentStatus => !currentStatus);
            }
          })
          .catch(e => new Error(e));
      })
      .finally(() => setIsAddingToCart(false));
  };

  useEffect(() => {
    const requiresReloadSeries
      = productSameSeries.findIndex(item => item.itemId === itemId) === -1;

    if (itemId && requiresReloadSeries) {
      const getItems = async () => {
        const [item, itemsAll] = await Promise.all([
          getProductById(itemId),
          getProducts(),
        ]);

        const imagesFixedUrl = item.images.map(
          img => `${REACT_APP_BASE_URL}${img}`,
        );

        item.images = imagesFixedUrl;

        const group = itemsAll
          .filter(productItem => getGroupKey(productItem) === item.namespaceId)
          .sort((item1, item2) =>
            sortNumericField(item1.capacity, item2.capacity, 'ASC'),
          )
          .sort((item1, item2) => item1.color.localeCompare(item2.color));

        const productGroupWithSameStorage = getProductGropBySameStorage(
          item.capacity,
          group,
        );

        const productGroupWithSameColor = getProductGropBySameColor(
          item.color,
          group,
        );

        const productsRelated = [...itemsAll].map(productItem => {
          return {
            ...productItem,
            image: `${REACT_APP_BASE_URL}/${productItem.image}`,
          };
        });

        const isFavourite
          = favouriteItems.findIndex(favItem => favItem.itemId === itemId) !== -1;

        const isCart
          = cartItems.findIndex(cartItem => cartItem.itemId === itemId) !== -1;

        setProductDetailed(item);
        setProductSameSeries(group);
        setProductCategory(group[0].category);
        setProductsSameCapacity(productGroupWithSameStorage);
        setProductsSameColor(productGroupWithSameColor);
        setRelatedProducts(productsRelated);
        setIsAddedToFav(isFavourite);
        setIsAddedToCart(isCart);
      };

      setIsLoading(true);
      getItems()
        .then(() => backToTop())
        .catch(e => Error(e))
        .finally(() => setIsLoading(false));
    }

    if (itemId && !requiresReloadSeries) {
      const getItem = async () => {
        const item = await getProductById(itemId);

        const imagesFixedUrl = item.images.map(
          img => `${REACT_APP_BASE_URL}${img}`,
        );

        item.images = imagesFixedUrl;

        const productGroupWithSameStorage = getProductGropBySameStorage(
          item.capacity,
          productSameSeries,
        );

        const productGroupWithSameColor = getProductGropBySameColor(
          item.color,
          productSameSeries,
        );

        const isFavourite
          = favouriteItems.findIndex(favItem => favItem.itemId === itemId) !== -1;
        const isCart
          = cartItems.findIndex(cartItem => cartItem.itemId === itemId) !== -1;

        setProductDetailed(item);
        setProductsSameCapacity(productGroupWithSameStorage);
        setProductsSameColor(productGroupWithSameColor);
        setIsAddedToFav(isFavourite);
        setIsAddedToCart(isCart);
      };

      getItem().catch(e => Error(e));
    }

    return () => setIsLoading(false);
  }, [itemId]);

  return (
    <>
      {isLoading && <Loader fullScreen />}

      {productDetailed && (
        <div className="product-detail">
          <Breadcrumb path={location.pathname} />
          <div className="product-detail__back">
            <ButtonBack path='../'/>
          </div>
          <Typography type="title" level="1" className="product-detail__title">
            {productDetailed?.name}
          </Typography>

          <section
            className="
            product-detail__section
            product-detail__gallery"
          >
            <Slider
              slidesToShow={1}
              stepBy={1}
              duration={300}
              className="product-detail"
              thumbs={productDetailed.images}
              navDots={false}
              navArrows={false}
            >
              {productDetailed.images.map(image => (
                <SliderItem key={image}>
                  <img src={image} alt={productDetailed.name} />
                </SliderItem>
              ))}
            </Slider>
          </section>

          <section
            className="
            product-detail__section
            product-detail__description"
          >
            <Typography
              type="title"
              level="2"
              className="product-detail__description-title"
            >
              About
            </Typography>
            {productDetailed.description.map(paragraph => (
              <div key={paragraph.title}>
                <Typography
                  type="title"
                  level="3"
                  className="product-detail__text-title"
                >
                  {paragraph.title}
                </Typography>
                <Typography
                  type="text"
                  weight="500"
                  className="product-detail__text"
                >
                  {paragraph.text}
                </Typography>
              </div>
            ))}
          </section>

          <section
            className="
              product-detail__section
              product-detail__actions"
          >
            <div
              className="
              product-detail__actions-column
              product-detail__actions-column--main"
            >
              <div className="product-detail__select">
                <Typography
                  type="text"
                  size="sm"
                  weight="600"
                  className="product-detail__select-label"
                >
                  Available colors
                </Typography>
                <div className="product-detail__select-list product-colors">
                  {productsSameCapacity.map(item => (
                    <Link
                      key={item.itemId}
                      to={`../${item.itemId}`}
                      style={{
                        backgroundColor: getColorHexByName(item.color),
                      }}
                      className={clsx(
                        'product-colors__link',
                        item.color === productDetailed.color && 'active',
                      )}
                      title={item.color}
                      aria-label={item.color}
                    />
                  ))}
                </div>
              </div>
              <div className="product-detail__select">
                <Typography
                  type="text"
                  size="sm"
                  weight="600"
                  className="product-detail__select-label"
                >
                  Select capacity
                </Typography>
                <div className="product-detail__select-list product-capacity">
                  {productsSameColor.map(item => (
                    <Link
                      key={item.itemId}
                      to={`../${item.itemId}`}
                      className={clsx(
                        'product-capacity__link',
                        item.capacity === productDetailed.capacity && 'active',
                      )}
                      title={item.capacity}
                      aria-label={item.capacity}
                    >
                      {item.capacity}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="product-detail__prices">
                <p className="product-detail__price-discount">
                  {productDetailed.priceDiscount}
                </p>
                <p className="product-detail__price-regular">
                  {productDetailed.priceRegular}
                </p>
              </div>
              <div className="product-detail__buttons">
                <ButtonAdd isAdded={isAddedToCart} onClick={handleAddDelCart} isLoading={isAddingToCart} />
                <ButtonFavourite
                  isAdded={isAddedToFav}
                  onClick={handleAddDelFav}
                  isLoading={isAddingToFav}
                />
              </div>
              <div
                className="
                  product-detail__specs
                  product-detail__specs--actions"
              >
                <Specifications
                  type="mini"
                  productInfo={productDetailed}
                  keys={SpecificationsPhoneSimplified}
                />
              </div>
            </div>
            <div
              className="
              product-detail__actions-column
              product-detail__actions-column--secondary
              "
            >
              <Typography
                type="text"
                size="sm"
              >{`ID: ${productDetailed?.id}`}</Typography>
            </div>
          </section>

          <section
            className="
            section
            product-detail__section
            product-detail__specs"
          >
            <Typography
              type="title"
              level="2"
              className="product-detail__description-title"
            >
              Tech Specs
            </Typography>
            <Specifications
              productInfo={productDetailed}
              type="full"
              keys={SpecificationsPhone}
            />
          </section>

          <section
            className="
            product-detail__section
            product-detail__offers"
          >
            {relatedProducts.length > 0 && (
              <ProductCardSlider
                title="You may also like"
                products={relatedProducts}
              />
            )}
          </section>
        </div>
      )}
    </>
  );
};

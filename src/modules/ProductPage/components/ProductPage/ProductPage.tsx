/* eslint-disable @typescript-eslint/indent */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CurrentPath } from '@modules/shared/components/CurrentPath';
import {
  UltimateProducts,
  useProducts,
} from '@modules/shared/components/Context/ProductsContext';
// eslint-disable-next-line max-len
import { useGadgets } from '@modules/shared/components/Context/GadgetsContext';
import cn from 'classnames';
import { Price } from '@modules/shared/components/Price/Price';
// eslint-disable-next-line max-len
import {
  Char,
  ShowCharacteristics,
} from '@modules/shared/components/ShowCharacteristics';
import { BaseSlider } from '@modules/HomePage/components/BaseSlider/';
import { BackLink } from '@modules/shared/components/BackLink';
// eslint-disable-next-line max-len
import { useCart } from '@modules/shared/components/Context/';
// eslint-disable-next-line max-len
import { useFavorites } from '@modules/shared/components/Context/';
import { sortItems } from '@modules/ItemsPage/components/ItemsPage/';
import { Loader } from '@modules/shared/components/Loader';
import { ColorsAvailable } from './ColorsAvailable';
import { PhotoSlider } from './PhotoSlider';
import { CapacityAvailable } from './CapacityAvailable';
import { DescriptionUnifier } from './DescriptionUnifier';
import { Icon } from '@modules/shared/components/Icon';

export const ProductPage: React.FC = () => {
  // #region States
  const { cart, toggleProductInCart, isInCart } = useCart();
  const { favorites, toggleFavorites, isFavorited } = useFavorites();
  const { id } = useParams();
  const [activePhoto, setActivePhoto] = useState(0);
  const { products } = useProducts();
  const { gadgets } = useGadgets();
  const [activeGadget, setActiveGadget] = useState<Gadget | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mayLikeProducts] = useState(sortItems(products.phones, 'random'));
  const [inCart, setInCart] = useState(false);
  const [favorited, setFavorited] = useState(false);
  // #endregion

  const charsToShow: Array<Char> = [
    { value: activeGadget?.screen || null, title: 'Screen' },
    { value: activeGadget?.resolution || null, title: 'Resolution' },
    { value: activeGadget?.processor || null, title: 'Processor' },
    { value: activeGadget?.ram || null, title: 'RAM' },
  ];

  const techSpecsToShow: Array<Char> = [
    ...charsToShow,
    { title: 'Capacity', value: activeGadget?.capacity || null },
    { title: 'Camera', value: activeGadget?.camera || null },
    { title: 'Zoom', value: activeGadget?.zoom || null },
  ];

  const inCartText = inCart ? 'In cart' : 'Add to cart';

  // #region Local Functions
  const onActiveGadgetChange = (
    charToChange: 'capacity' | 'color',
    value: string,
  ) => {
    setActiveGadget(cur => {
      if (cur === null) {
        return null;
      }

      return (
        gadgets.find(elem => {
          if (elem.namespaceId === cur?.namespaceId) {
            if (charToChange === 'capacity') {
              return (
                elem[charToChange] === value &&
                elem.color === activeGadget?.color
              );
            }

            return (
              elem[charToChange] === value &&
              elem.capacity === activeGadget?.capacity
            );
          }

          return false;
        }) || null
      );
    });
  };

  const onColorChange = (color: string) => onActiveGadgetChange('color', color);

  const onCapacityChange = (capacity: string) => {
    onActiveGadgetChange('capacity', capacity);
  };

  const onPhotoChange = (index: number) => {
    setActivePhoto(index);
  };

  const findProductInGadgets = useCallback(
    (gadgetElement: Gadget | null) => {
      if (!gadgetElement) {
        return null;
      }

      return (
        products[gadgetElement.category as keyof UltimateProducts].find(
          elem => {
            if (
              elem.itemId === gadgetElement.id &&
              elem.capacity === gadgetElement.capacity
            ) {
              return true;
            }

            return false;
          },
        ) || null
      );
    },
    [products],
  );
  // #endregion

  // #region UseEffects
  useEffect(() => {
    setActiveGadget(() => {
      return (
        gadgets.find(elem => {
          if (typeof id !== 'undefined' && elem.id === id) {
            return true;
          }

          return false;
        }) || null
      );
    });
    setIsLoading(false);
  }, [id, gadgets, findProductInGadgets]);

  useEffect(() => {
    setActiveProduct((cur: Product | null) => {
      if (activeGadget?.id !== cur?.itemId) {
        return findProductInGadgets(activeGadget);
      }

      return cur;
    });
  }, [activeGadget, findProductInGadgets]);

  useEffect(() => {
    setInCart(isInCart?.(activeProduct) || false);
  }, [cart, activeProduct, isInCart]);

  useEffect(() => {
    if (activeProduct) {
      setFavorited(isFavorited?.(activeProduct) || false);
    }
  }, [favorites, isFavorited, activeProduct]);

  return (
    <div className="productPage">
      {isLoading && <Loader />}

      {!isLoading && activeGadget !== null ? (
        <React.Fragment>
          <div className="productPage__navigation container">
            <CurrentPath
              title={activeGadget?.name}
              additionalClass="productPage__path"
            />
            <BackLink additionalClass="productPage__backLink" />
          </div>
          <div className="productPage__content container">
            <div className="productPage__main">
              <h1 className="productPage__title">{activeGadget?.name}</h1>

              <div className="productPage__photoZone">
                <img
                  src={`/${activeGadget?.images[activePhoto]}`}
                  alt="product photo"
                  className="productPage__photo"
                />

                <div className="productPage__slider">
                  <PhotoSlider
                    photos={activeGadget.images}
                    activePhoto={activePhoto}
                    onChange={onPhotoChange}
                  />
                </div>
              </div>

              <div className="productPage__characteristics">
                <div className="productPage__availableColors">
                  <span className="productPage__smallTitle">
                    Available colors
                  </span>

                  <ColorsAvailable
                    gadget={activeGadget}
                    onChange={onColorChange}
                  />
                </div>

                <div className="productPage__capacity">
                  <span className="productPage__smallTitle">
                    Select capacity
                  </span>

                  <CapacityAvailable
                    gadget={activeGadget}
                    onChange={onCapacityChange}
                  />
                </div>
                <div className="productPage__priceContainer">
                  <Price
                    fullPrice={activeGadget?.priceRegular || null}
                    priceDiscount={activeGadget?.priceDiscount || null}
                    additionalClass="productPage__price"
                  />
                  <div
                    className={cn(
                      'productCart__buttons',
                      'productPage__priceButtons',
                    )}
                  >
                    <button
                      className={cn(
                        'button',
                        'button--inverted',
                        'productPage__priceButton',
                        {
                          'button--addedToCart': inCart,
                        },
                      )}
                      onClick={() => toggleProductInCart?.(activeProduct)}
                    >
                      {inCartText}
                    </button>
                    <button
                      className="button productPage__priceButton"
                      onClick={() => toggleFavorites?.(activeProduct)}
                    >
                      <Icon
                        iconSlug="Heart"
                        className={cn({ 'icon--favorited': favorited })}
                      />
                    </button>
                  </div>
                </div>

                <ShowCharacteristics chars={charsToShow} />
              </div>
            </div>

            <div className="productPage__about">
              <h3 className="productPage__aboutHeader productPage__h3">
                About
              </h3>
              <DescriptionUnifier
                partsOfDescription={activeGadget.description}
              />
            </div>

            <div className="productPage__techSpecs productPage__h3">
              <h3 className="productPage__h3 productPage__techSpecsHeader">
                Tech Specs
              </h3>
              <ShowCharacteristics chars={techSpecsToShow} />
            </div>

            <div className="productPage__mayLike">
              <BaseSlider
                key={window.innerWidth}
                products={mayLikeProducts}
                title="May also like"
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        ''
      )}

      {!isLoading && !activeGadget ? (
        <div className="productPage__notFound container">
          <h2 className="main__title productPage__notFoundTitle">
            Product was not found
          </h2>

          <img
            src="/public/img/product-not-found.png"
            alt="Product not found image"
            className="pageNotFound__photo"
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

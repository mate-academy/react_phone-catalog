import React, { useEffect, useState, useContext } from 'react';
import cn from 'classnames';

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ProductGallery } from '../ProductGallery/ProductGallery';
import { Picker } from '../Picker/Picker';
import { PickerOption } from '../../types/PickerOption';
import { BreadcrumbsData } from '../../types/breadcrumbsData';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductFeature } from '../ProductFeature/ProductFeature';
import { ProductSlider } from '../ProductSlider/ProductSlider';

import {
  ReactComponent as Favourites,
} from '../../images/icons/favourites.svg';
import {
  ReactComponent as FavouritesFilled,
} from '../../images/icons/favourites_filled.svg';

import { getUpSalesProducts } from '../../helpers/getUpSalesProducrs';
import { Product } from '../../types/Product';
import { BackLink } from '../BackLink/BackLink';
import { ShopContext } from '../../ShopContext';

type Props = {
  productData: {
    colorData: PickerOption[],
    capacityData: PickerOption[],
    breadcrumbsData: BreadcrumbsData,
  };
  product: ProductDetails;
};

export const ProductPageContent: React.FC<Props> = (
  { productData, product },
) => {
  const { capacityData, colorData, breadcrumbsData } = productData;
  const {
    id,
    name,
    images,
    priceRegular,
    priceDiscount,
    screen,
    ram,
    resolution,
    processor,
    description,
    camera,
    zoom,
    cell,
  } = product;

  const specsData = [
    { name: 'Screen', value: screen },
    { name: 'Resolution', value: resolution },
    { name: 'Processor', value: processor },
    { name: 'Ram', value: ram },
    { name: 'Camera', value: camera },
    { name: 'Zoom', value: zoom },
    { name: 'Cell', value: cell.join(', ') },
  ];

  const [sliderData, setSliderData] = useState<Product[]>([]);
  const {
    cart,
    favourites,
    addToFavourites,
    removeFromFavourites,
    addToCart,
  } = useContext(ShopContext);

  const isButtonActive = cart.filter(p => p.phoneId === id).length > 0;
  const buttonText = isButtonActive ? 'Added to cart' : 'Add to cart';
  const isInFavourites = favourites.filter(p => p.phoneId === id).length > 0;

  const handleFavouriteButtonClick = () => {
    if (isInFavourites) {
      removeFromFavourites(id);
    } else {
      addToFavourites(id);
    }
  };

  useEffect(() => {
    const header = document.getElementById('header');

    header?.scrollIntoView();

    getUpSalesProducts(product.priceDiscount)
      .then(upSaleProducts => setSliderData(upSaleProducts));
  }, [product]);

  const isSliderData = sliderData.length > 0;

  return (
    <>
      <div className="product-page__breadcrumbs">
        <Breadcrumbs data={breadcrumbsData} />
      </div>
      <div className="product-page__back-link">
        <BackLink />
      </div>
      <section className="product-page__product-info">
        <div className="product-info">
          <h1 className="product-info__title">
            {name}
          </h1>
          <div className="product-info__content">
            <div className="product-info__gallery">
              <ProductGallery images={images} />
            </div>
            <div className="product-info__container">
              <div className="product-info__actions">
                <div className="product-info__picker">
                  <Picker
                    title="Available colors"
                    isColor
                    data={colorData}
                  />
                </div>
                <div className="product-info__picker">
                  <Picker
                    title="Select capacity"
                    data={capacityData}
                  />
                </div>
                <div className="product-info__prices">
                  <span className="product-info__price">{`$${priceDiscount}`}</span>
                  <span
                    className="product-info__price product-info__price--old"
                  >
                    {`$${priceRegular}`}
                  </span>
                </div>
                <div className="product-info__buttons">
                  <button
                    className={cn('product-info__cart button button--primary',
                      { 'button--primary--active': isButtonActive })}
                    type="button"
                    onClick={() => (addToCart(id))}
                  >
                    {buttonText}
                  </button>
                  <button
                    className="product-info__fav button button__fav"
                    type="button"
                    onClick={handleFavouriteButtonClick}
                  >
                    {isInFavourites
                      ? <FavouritesFilled />
                      : <Favourites />}
                  </button>
                </div>
                <div className="product-info__features">
                  <ProductFeature name="Screen" value={screen} />
                  <ProductFeature name="Ram" value={ram} />
                  <ProductFeature name="Resolution" value={resolution} />
                  <ProductFeature name="Processor" value={processor} />
                </div>
              </div>
              <div className="product-info__id-container">
                <span className="product-info__id">ID: 802390</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="product-page__detailed-info">
        <section
          className="product-page__about about"
          data-cy="productDescription"
        >
          <h2 className="about__title">About</h2>
          {description.map(article => (
            <article className="about__article">
              <h3 className="about__article-title">{article.title}</h3>
              <p className="about__article-description">{article.text}</p>
            </article>
          ))}
        </section>
        <section className="product-page__specs">
          <h2 className="product-page__specs-title">Tech specs</h2>
          {specsData.map(specs => (
            <div className="product-page__specs-item">
              <div className="product-page__specs-name">
                {specs.name}
              </div>
              <div className="product-page__specs-value">
                {specs.value}
              </div>
            </div>
          ))}
        </section>
      </div>
      {isSliderData && (
        <div className="product-page__upsale">
          <ProductSlider name="You may also like" data={sliderData} />
        </div>
      )}
    </>
  );
};

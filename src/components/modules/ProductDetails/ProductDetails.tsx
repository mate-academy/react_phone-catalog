import './ProductDetails.style.scss';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { updateCrumbs } from '../../../features/CrumbsSlice/CrumbsSlice';
import { getProduct } from '../../../api/fetchProducts';

import { Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../shared/BackButton/BackButton';
import { Slider } from '../../shared/Slider/Slider';
import { ProductPrice } from '../../shared/ProductCard/ProductPrice/ProductPrice';
import { ProductTechSpecs } from '../../shared/ProductCard/ProductTechSpecs/ProductTechSpec';
import { ProductCardButtons } from '../../shared/ProductCard/ProductCardButtons/ProductCardButtons';

import { ShopItem } from '../../../types/ShopItem';

export const ProductDetails = () => {
  const dispatch = useAppDispatch();

  const recommendations = useAppSelector(
    state => state.products.products,
  ).slice(0, 20);

  const location = useLocation()
    .pathname.split('/')
    .filter(path => path.trim().length > 0);
  const productCategory = location[0];

  const [productId, setProductId] = useState(location[1]);
  const [product, setProduct] = useState<ShopItem>();
  const [error, setError] = useState<any>();

  const findProduct = async () => {
    try {
      const result = await getProduct(productCategory, productId);
      if (result) {
        setProduct(result);
      }
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    findProduct();
    dispatch(updateCrumbs(productId.split('-').join(' ')));
  }, [productCategory, productId, dispatch]);

  if (!product)
    return (
      <>
        <Breadcrumbs />
        <BackButton />

        <p>{error?.message || 'Product not found'}</p>
      </>
    );

  const {
    name,
    id,
    priceRegular,
    priceDiscount,
    images,
    description,
    capacity,
    capacityAvailable,
    colorsAvailable,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = product;

  const shortTechSpecs = { screen, resolution, processor, ram };
  const extendedTechSpecs = {
    ...shortTechSpecs,
    'built in memory': capacity,
    camera,
    zoom,
    cell,
  };

  return (
    <div className="product-page">
      <div className="product-page__crumbs">
        <Breadcrumbs />
      </div>

      <div className="product-page__backbutton">
        <BackButton />
      </div>

      <div className="product-page__content">
        <h1 className="product-page__title">{name}</h1>

        <div className="product-page__sections">
          <div className="product-page__section">
            <div className="product-page__product-design">
              <img src={images[0]} alt="product image" />
            </div>

            <div className="product-page__article article">
              <h3 className="article__title"></h3>

              <div className="article__paragraphs">
                {description.map((info: any) => {
                  const { title, text } = info;
                  return (
                    <div key={title} className="article__paragrapgh">
                      <h4 className="article__paragrapgh__heading">{title}</h4>
                      <div className="article__paragraph__text">{text}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="product-page__section">
            <div className="product-page__sidebar sidebar">
              <div className="sidebar__options">
                <div className="sidebar__options__color">
                  {colorsAvailable.map((color: any) => (
                    <div key={color} className={`${color}`}></div>
                  ))}
                </div>

                <div className="sidebar__options__capacity">
                  {capacityAvailable.map((capacity: any) => (
                    <div
                      key={capacity}
                      className="sidebar__options__capacity__info-wrap"
                    >
                      <p className="sidebar__options__capacity__info">
                        {capacity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar__actions">
                <ProductPrice
                  regularPrice={priceRegular}
                  discountPrice={priceDiscount}
                />

                <ProductCardButtons id={id} />
              </div>

              <div className="sidebar__tech-specs">
                <ProductTechSpecs specs={shortTechSpecs} />
              </div>
            </div>

            <div className="product-page__tech-specs">
              <ProductTechSpecs specs={extendedTechSpecs} />
            </div>
          </div>
        </div>

        <Slider category={'mayLike'} products={recommendations} />
      </div>
    </div>
  );
};

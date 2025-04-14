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
import classNames from 'classnames';

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

  const [productColor, setProductColor] = useState<string>();
  const [productCapacity, setProductCapacity] = useState<string>();

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

  useEffect(() => {
    if (product) {
      setProductCapacity(product.capacity);
      setProductColor(product.color);
    }
  }, [productId]);

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
          <div className="product-page__section product-page__section--design">
            <div className="product-page__product-design">
              <img
                src={images[0]}
                alt="product image"
                className="product-page__product-design__photo"
              />
            </div>

            <div className="product-page__sidebar sidebar">
              <div className="sidebar__options">
                <div className="sidebar__options__block">
                  <p className="sidebar__options__title">available colors</p>

                  <div className="sidebar__options__wrap">
                    {colorsAvailable.map((color: any) => {
                      const normalizeColor = color
                        .split(' ')
                        .join('-')
                        .toLowerCase();

                      console.log(normalizeColor, productColor);

                      return (
                        <div
                          key={color}
                          className={classNames(
                            'sidebar__options__color-wrap',
                            {
                              'sidebar__options__color-wrap--picked':
                                normalizeColor === productColor,
                            },
                          )}
                        >
                          <div
                            className={`sidebar__options__color sidebar__options__color--${normalizeColor}`}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="sidebar__options__block sidebar__options__block--capacity">
                  <p className="sidebar__options__title">select capacity</p>
                  <div className="sidebar__options__wrap">
                    {capacityAvailable.map((capacity: any) => (
                      <p
                        key={capacity}
                        className={classNames('sidebar__options__capacity', {
                          'sidebar__options__capacity--picked':
                            productCapacity === capacity,
                        })}
                      >
                        {capacity}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sidebar__actions">
                <ProductPrice
                  regularPrice={priceRegular}
                  discountPrice={priceDiscount}
                />

                <ProductCardButtons id={id} productPage={true} />
              </div>

              <div className="sidebar__tech-specs">
                <ProductTechSpecs specs={shortTechSpecs} />
              </div>
            </div>
          </div>

          <div className="product-page__section product-page__section--info">
            <div className="product-page__article article">
              <h3 className="article__title">about</h3>

              <div className="article__paragraphs">
                {description.map((info: any) => {
                  const { title, text } = info;
                  return (
                    <div key={title} className="article__paragraph">
                      <h4 className="article__paragraph__heading">{title}</h4>
                      <div className="article__paragraph__text">{text}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="product-page__tech-specs tech-specs">
              <h3 className="tech-specs__title">tech specs</h3>
              <div className="tech-specs__content">
                <ProductTechSpecs specs={extendedTechSpecs} />
              </div>
            </div>
          </div>
        </div>

        <div className="product-page__slider">
          <Slider category={'mayLike'} products={recommendations} />
        </div>
      </div>
    </div>
  );
};

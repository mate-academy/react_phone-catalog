import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { getProductDetails } from '../../features/productDetailsSlice';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductSlider } from '../ProductSlider';

import './ProductDetails.scss';
import { productsFiltering } from '../../helpers/productsFiltering';
import { getProducts } from '../../features/productsSlice';
import { ProductActions } from '../ProductActions';
import { Loader } from '../Loader';

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const products = useAppSelector(state => state.products.products);
  const loaded = useAppSelector(state => state.productDetails.loaded);
  const currentPath = location.pathname;
  const youMayAlsoLike = useMemo(() => {
    return productsFiltering.getRandomizedList(products);
  }, [products]);

  const details = useAppSelector(state => {
    return state.productDetails.productDetails;
  });

  const currentProduct = useMemo(() => {
    return products.find(product => product.name === details?.name);
  }, [products, details]);

  const [currentImg, setCurrentImg] = useState('');

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getProducts());

    if (details) {
      setCurrentImg(details.images[0]);
    }
  }, [dispatch, details]);

  const handleColorChange = (color: string) => {
    if (details) {
      const newLocation = currentPath.replace(details.color, color);

      navigate(newLocation);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleCapacityChange = (capacity: string) => {
    if (details) {
      const newLocation = currentPath.replace(
        details.capacity.toLowerCase(),
        capacity.toLowerCase(),
      );

      navigate(newLocation);
    }
  };

  let detailsExtra: [string, string][] = [];

  if (details) {
    detailsExtra = [
      ['Screen', details.screen],
      ['Resolution', details.resolution],
      ['Processor', details.processor],
      ['RAM', details.ram],
      ['Built in memory', details.capacity],
      ['Camera', details.camera],
      ['Zoom', details.zoom],
      ['Cell', details.screen],
      ['Screen', details.screen],
    ];
  }

  return (
    <>
      {loaded ? (
        <>
          {loaded && details ? (
            <section className="details">
              <div className="details__top">
                <div className="details__bread-wrapper">
                  <Breadcrumbs items={{
                    phones: '/phones',
                    [details.name]: `/phones/${details.id}`,
                  }}
                  />
                </div>
                <div className="details__back">
                  {/* eslint-disable-next-line */}
                  <button
                    onClick={goBack}
                    className="details__back_button"
                    data-cy="backButton"
                  >
                    Back
                  </button>
                </div>
                <h1 className="details__title">
                  {details.name}
                </h1>
              </div>

              <div className="details__product">
                <span className="details__product__id">
                  {`ID: ${currentProduct?.id}`}
                </span>
                <div className="product__gallery">
                  {details.images.map(imgDet => (
                    /* eslint-disable-next-line */
                    <div
                      className={cn('img-container', {
                        'img-container--active': imgDet === currentImg,
                      })}
                      key={imgDet}
                      onClick={() => setCurrentImg(imgDet)}
                    >
                      <img src={`${imgDet}`} alt="" />
                    </div>
                  ))}
                </div>
                <div className="product__current-img">
                  <img src={`${currentImg}`} alt="Phone" />
                </div>

                <div className="product__extra">
                  <div className="extra__colors">
                    <span className="extra__colors_title">
                      Available colors
                    </span>
                    <div className="extra__colors_choise">
                      {details.colorsAvailable.map((color) => (
                        <div
                          key={color}
                          className={cn('extra__colors_wrapper', {
                            'extra__colors_wrapper--activ': color
                              === details.color,
                          })}
                        >
                          { /* eslint-disable-next-line */}
                          <button
                            className={`extra__colors_color extra__colors_color--${color}`}
                            onClick={() => handleColorChange(color)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="cross-line" />

                  <div className="extra__capacity">
                    <span className="extra__capacity_title">
                      Available colors
                    </span>
                    <div className="extra__capacity_choise">
                      {details.capacityAvailable.map((capacity) => (
                        /* eslint-disable-next-line */
                        <button
                          key={capacity}
                          onClick={() => handleCapacityChange(capacity)}
                          className={cn('extra__capacity_option', {
                            'extra__capacity_option--active': capacity
                              === details.capacity,
                          })}
                        >
                          {capacity.replace(/(\d+)\s?(GB)/g, '$1 $2')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cross-line" />

                  <div className="extra__price">
                    <span className="extra__price_discount">
                      {details.priceDiscount}
                    </span>
                    <span className="extra__price_regular">
                      {details.priceRegular}
                    </span>
                  </div>

                  <div className="extra__actions">
                    {currentProduct && (
                      <ProductActions product={currentProduct} />
                    )}

                  </div>

                  <div className="extra__about">
                    <div className="extra__about_wrapper">
                      <div className="extra__about_title">
                        Screen
                      </div>
                      <div className="extra__about_description">
                        {details.screen}
                      </div>
                    </div>

                    <div className="extra__about_wrapper">
                      <div className="extra__about_title">
                        Resolution
                      </div>
                      <div className="extra__about_description">
                        {details.resolution}
                      </div>
                    </div>

                    <div className="extra__about_wrapper">
                      <div className="extra__about_title">
                        Processor
                      </div>
                      <div className="extra__about_description">
                        {details.processor}
                      </div>
                    </div>

                    <div className="extra__about_wrapper">
                      <div className="extra__about_title">
                        RAM
                      </div>
                      <div className="extra__about_description">
                        {details.ram}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section
                className="details__description"
                data-cy="productDescription"
              >
                <div className="details__about">
                  <span className="details__title">
                    About
                  </span>

                  <div className="details__about_cross-line" />

                  <div className="about__block">
                    {details.description.map(desc => (
                      <div key={desc.title} className="about__section">
                        <span className="about__title">{desc.title}</span>
                        {desc.text.map(text => (
                          <p
                            key={text}
                            className="about__description"
                          >
                            {text}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="details__tech-specs">
                  <span className="details__title">
                    Tech specs
                  </span>

                  <div className="details__about_cross-line" />

                  <div className="details__tech-specs_cross-line" />

                  <div className="extra__about">
                    {detailsExtra.map(detail => (
                      <div className="extra__about_wrapper" key={detail[0]}>
                        <div className="extra__about_title">
                          {detail[0]}
                        </div>
                        <div className="extra__about_description">
                          {detail[1]}
                        </div>
                      </div>
                    ))}

                    <div className="extra__about_wrapper">
                      <div className="extra__about_title">
                        Cell
                      </div>
                      <div className="extra__about_description">
                        {details.cell.join('/')}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="you-may-also-like">
                <ProductSlider
                  title="You may also like"
                  productList={youMayAlsoLike}
                />
              </div>
            </section>
          ) : (
            <p className="details__error">Phone was not found</p>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductDetails;

/* eslint-disable max-len */

import { Fragment, useEffect, useRef, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHouse } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductsContext } from '../../Context/ProductsContext';
import { ProductDetails } from '../../types/ProductDetails';
import { GoodsSlider } from '../../components/GoodsSlider';
import { Breadcrumb } from '../../components/Breadcrumb';

import s from './ProductPage.module.scss';

export const ProductPage = () => {
  const products = useContextSelector(ProductsContext, ctx => ctx.products);
  const addProdToCart = useContextSelector(
    ProductsContext,
    ctx => ctx.addProdToCart,
  );
  const isProdInCart = useContextSelector(
    ProductsContext,
    ctx => ctx.isProdInCart,
  );
  const addProdToFavourites = useContextSelector(
    ProductsContext,
    ctx => ctx.addProdToFavourites,
  );
  const isProdInFavourites = useContextSelector(
    ProductsContext,
    ctx => ctx.isProdInFavourites,
  );

  const { itemId } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<
    ProductDetails | undefined
  >(undefined);

  const product = products.find(item => item.itemId === itemId);

  useEffect(() => {
    if (!product) {
      return;
    }

    fetch(`/api/${product?.category}.json`)
      .then(response => response.json())
      .then((data: ProductDetails[]) => {
        const prod = data.find(i => i.id === itemId);

        if (prod) {
          setProductDetails(prod);
        } else {
          throw new Error('Error fetching data');
        }
      })
      .catch(error => {
        throw new Error('Error fetching data:', error);
      });
  }, [products, product, itemId]);

  const imageRef = useRef<HTMLImageElement | null>(null);

  if (!product && products.length) {
    return navigate('/not-found');
  }

  type TechSpecListType = {
    title: string;
    key: string;
  };

  const techSpecList: TechSpecListType[] = [
    { title: 'Screen', key: 'screen' },
    { title: 'Resolution', key: 'resolution' },
    { title: 'Processor', key: 'processor' },
    { title: 'RAM', key: 'ram' },
    { title: 'Built in memory', key: 'capacity' },
    { title: 'Camera', key: 'camera' },
    { title: 'Zoom', key: 'zoom' },
    { title: 'Cell', key: 'cell' },
  ];

  // const colors = [
  //   { green: '' },
  //   { 'space grey': '' },
  //   { black: '' },
  //   { yellow: '' },
  //   { white: '' },
  //   { purple: '' },
  //   { red: '' },
  // ];

  function getSpec(key: string): string {
    if (!productDetails) {
      return '';
    }

    const field = productDetails[key as keyof ProductDetails];

    switch (typeof field) {
      case 'string':
        return field;
      case 'object':
        return field.join(', ');
      default:
        return '';
    }
  }

  const specs = techSpecList.map(spec => {
    return { ...spec, key: getSpec(spec.key) };
  });

  function handleAddToCart() {
    if (product) {
      addProdToCart(product);
    }
  }

  function handleAddToFavourites() {
    if (product) {
      addProdToFavourites(product);
    }
  }

  function handleImageCkick(imSrc: string) {
    if (imageRef.current) {
      imageRef.current.src = `/${imSrc}`;
    }
  }

  function handleColorBtnClick(color: string) {
    navigate(
      `/product/${productDetails?.namespaceId}-${productDetails?.capacity.toLowerCase()}-${color}`,
    );
  }

  function handleCapacityBtnClick(capacity: string) {
    navigate(
      `/product/${productDetails?.namespaceId}-${capacity.toLowerCase()}-${productDetails?.color}`,
    );
  }

  return (
    <>
      {productDetails && product && (
        <div className={`container ${s.product_container}`}>
          <Breadcrumb />
          <h1 className="title is-3">{productDetails?.name}</h1>
          <div className="fixed-grid">
            <div className="grid is-gap-8">
              <div className="cell">
                <div className="columns">
                  <div className="column is-narrow">
                    {productDetails?.images.map((im, idx) => (
                      <div className={`${s.small_img}`} key={idx}>
                        <figure
                          className={`image ${s.small_img__figure}`}
                          onClick={() => handleImageCkick(im)}
                        >
                          <img src={`/${im}`} alt={`image-${im}`} />
                        </figure>
                      </div>
                    ))}
                  </div>
                  <div className="column">
                    <div className={`${s.big_img}`}>
                      <figure className={`image ${s.big_img__figure}`}>
                        <img
                          ref={imageRef}
                          src={`/${productDetails?.images[0]}`}
                          alt={`image`}
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cell">
                <div className="columns">
                  <div className="column ">
                    <div className={`block ${s.bottom_bordered}`}>
                      <p>Available colors</p>
                      <div className="is-flex">
                        {productDetails?.colorsAvailable.map((color, idx) => (
                          <button
                            className={classNames(
                              `tag is-rounded mr-2 ${s.color_btn}`,
                              {
                                [`${s.is_active}`]:
                                  productDetails?.color === color,
                              },
                            )}
                            key={idx}
                            onClick={() => handleColorBtnClick(color)}
                          >
                            <span
                              className={`${s.color_btn__inside}`}
                              style={{
                                backgroundColor: `${color}`,
                              }}
                              title={`${color}`}
                            ></span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={`block ${s.bottom_bordered}`}>
                      <p>Select capacity</p>
                      <div className="is-flex">
                        {productDetails?.capacityAvailable.map((cap, idx) => (
                          <button
                            className={classNames('tag mr-2', {
                              'is-dark': productDetails?.capacity === cap,
                              [`${s.capacity_btn}`]:
                                productDetails?.capacity !== cap,
                            })}
                            key={idx}
                            onClick={() => handleCapacityBtnClick(cap)}
                          >
                            {cap}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="block mb-4">
                      <b className="is-size-3 has-text-weight-extrabold mr-2">
                        $ {productDetails?.priceDiscount}
                      </b>
                      <del
                        className={`is-size-4 has-text-weight-semibold ${s.product_gray}`}
                      >
                        $ {productDetails?.priceRegular}
                      </del>
                    </div>
                    <div className="content mb-5 is-flex is-justify-content-space-between is-align-items-baseline">
                      <button
                        className={classNames(
                          // 'button',
                          `button ${s.cart_button}`,
                          {
                            [`${s.active}`]: isProdInCart(product),
                          },
                        )}
                        type="button"
                        onClick={handleAddToCart}
                      >
                        {isProdInCart(product)
                          ? 'Added to cart'
                          : 'Add to cart'}
                      </button>
                      <button
                        className={`button ${s.fav_button}`}
                        type="button"
                        onClick={handleAddToFavourites}
                      >
                        <span
                          className={classNames('icon', {
                            [`${s.blue_icon}`]: isProdInFavourites(product),
                          })}
                        >
                          <FontAwesomeIcon
                            icon={
                              isProdInFavourites(product)
                                ? faHeartSolid
                                : faHeart
                            }
                          />
                        </span>
                      </button>
                    </div>
                    <ul className="list">
                      <li className="is-flex is-justify-content-space-between">
                        <span>Screen</span>
                        <b>{productDetails?.screen}</b>
                      </li>
                      <li className="is-flex is-justify-content-space-between">
                        <span>Resolution</span>
                        <b>{productDetails?.resolution}</b>
                      </li>
                      <li className="is-flex is-justify-content-space-between">
                        <span>Processor</span>
                        <b>{productDetails?.processor}</b>
                      </li>
                      <li className="is-flex is-justify-content-space-between">
                        <span>RAM</span>
                        <b>{productDetails?.ram}</b>
                      </li>
                    </ul>
                    {/* </div> */}
                  </div>
                  <div className="column is-two-fifths has-text-right">
                    <span>ID: {product?.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed-grid">
            <div className="grid is-gap-8">
              <div className="cell">
                <h3 className={`title is-4 ${s.bordered_title}`}>About</h3>
                {productDetails?.description.map((el, idx) => (
                  <div key={idx} className="mb-5">
                    <h4 className="title is-5">{el.title}</h4>
                    <p>{el.text}</p>
                  </div>
                ))}
              </div>
              <div className="cell">
                <h3 className={`title is-4 ${s.bordered_title}`}>Tech specs</h3>
                <ul>
                  {specs.map((el, idx) => (
                    <Fragment key={idx}>
                      {el.key !== '' && (
                        <li className="is-flex is-justify-content-space-between">
                          <span>{el.title}</span>
                          <b>{el.key}</b>
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <h2 className="title is-3" style={{ position: 'absolute' }}>
            You may also like
          </h2>
          <GoodsSlider collectionType={'alsoLike'} typePagin={'light'} />
        </div>
      )}
    </>
  );
};

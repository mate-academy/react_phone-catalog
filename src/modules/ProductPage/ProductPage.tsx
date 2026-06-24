/* eslint-disable max-len */

import { Fragment, useEffect, useRef, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductsContext } from '../../Context/ProductsContext';
import { ProductDetails } from '../../types/ProductDetails';
import { GoodsSlider } from '../../components/GoodsSlider';
import { Breadcrumb } from '../../components/Breadcrumb';

import s from './ProductPage.module.scss';
import { Loader } from '../../components/Loader';
import { asset } from '../../hooks/utils';

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
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const product = products.find(item => item.itemId === itemId);

  useEffect(() => {
    if (!product) {
      setNotFound(true);
      setIsLoading(false);

      return;
    }

    fetch(
      `${window.location.origin}${import.meta.env.BASE_URL}/api/${product?.category}.json`,
    )
      .then(response => response.json())
      .then((data: ProductDetails[]) => {
        const prod = data.find(i => i.id === itemId);

        if (prod) {
          setProductDetails(prod);
          setNotFound(false);
        } else {
          throw new Error('Error fetching data');
        }
      })
      .catch(error => {
        setNotFound(true);
        throw new Error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [products, product, itemId]);

  const imageRef = useRef<HTMLImageElement | null>(null);

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

  const colors: { [key: string]: string }[] = [
    { black: '#000000' },
    { gold: '#FFD700' },
    { yellow: '#FFFF00' },
    { green: '#008000' },
    { midnightgreen: '#006400' },
    { silver: '#C0C0C0' },
    { spacegray: '#696969' },
    { 'space gray': '#696969' },
    { red: '#FF0000' },
    { white: '#FFFFFF' },
    { coral: '#FF7F50' },
    { rosegold: '#E7C8C8' },
    { 'rose gold': '#E7C8C8' },
    { midnight: '#191970' },
    { spaceblack: '#2F2F2F' },
    { blue: '#0000FF' },
    { sierrablue: '#87CEEB' },
    { graphite: '#2F4F4F' },
    { purple: '#800080' },
    { pink: '#FFC0CB' },
    { 'sky blue': '#87CEEB' },
    { starlight: '#F5F5DC' },
  ];

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

  function handleImageCkick(e: React.MouseEvent<HTMLElement>) {
    if (imageRef.current) {
      e.currentTarget.parentElement?.parentElement?.childNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          node.classList.remove(s.is_active);
        }
      });
      e.currentTarget.parentElement?.classList.add(s.is_active);
      const image = e.currentTarget.getAttribute('data-sourceimg') || '';

      imageRef.current.src = asset(image);
    }
  }

  function handleColorBtnClick(color: string) {
    navigate(
      `/product/${productDetails?.namespaceId}-${productDetails?.capacity.toLowerCase()}-${color}`,
    );
  }

  function handleCapacityBtnClick(capacity: string) {
    navigate(
      `/product/${productDetails?.namespaceId}-${capacity.toLowerCase()}-${productDetails?.color.replace(/\s/g, '-').toLowerCase()}`,
    );
  }

  return (
    <>
      {isLoading && <Loader />}

      {notFound && !isLoading && (
        <div className={`${s.big_img} ${s.not_found}`}>
          <h2 className={`title mb-2 ${s.home_titles} has-text-centered`}>
            Product not found
          </h2>
          <figure className={`image ${s.big_img__figure} ${s.not_found}`}>
            <img
              src={asset('img/product-not-found.png')}
              alt={'product not found'}
            />
          </figure>
        </div>
      )}

      {productDetails && product && (
        <>
          <Breadcrumb />
          <h1 className="title is-3 is-size-4-mobile">
            {productDetails?.name}
          </h1>

          <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet">
            <div className="grid is-gap-8 ">
              <div className="cell">
                <div className={`columns is-flex-mobile ${s.all_img_wrap}`}>
                  <div className="column is-flex-mobile p-0 is-flex-grow-0">
                    {productDetails?.images.map((im, idx) => (
                      <div
                        className={`${s.small_img} ${idx === 0 ? s.is_active : ''}`}
                        key={idx}
                      >
                        <figure
                          data-sourceimg={im}
                          className={`image ${s.small_img__figure}`}
                          onClick={handleImageCkick}
                        >
                          <img src={asset(im)} alt={`image-${im}`} />
                        </figure>
                      </div>
                    ))}
                  </div>
                  <div className="column p-0 is-flex-grow-0">
                    <div className={`${s.big_img}`}>
                      <figure className={`image ${s.big_img__figure}`}>
                        <img
                          ref={imageRef}
                          src={asset(productDetails?.images[0])}
                          alt={`image`}
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cell">
                <div className={`${s.bottom_bordered}`}>
                  <div className="is-flex is-justify-content-space-between">
                    <p className="is-size-7">Available colors</p>
                    <span>ID: {product?.id}</span>
                  </div>

                  <div className="is-flex">
                    {productDetails?.colorsAvailable.map((color, idx) => (
                      <button
                        className={classNames(
                          `tag is-rounded mr-2 ${s.color_btn}`,
                          {
                            [`${s.is_active}`]: productDetails?.color === color,
                          },
                        )}
                        key={idx}
                        onClick={() =>
                          handleColorBtnClick(
                            color.replace(/\s/g, '-').toLowerCase(),
                          )
                        }
                      >
                        <span
                          className={`${s.color_btn__inside}`}
                          style={{
                            backgroundColor: `${colors.find(c => c[color])?.[color] || '#ffffff'}`,
                          }}
                          title={`${color}`}
                        ></span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`${s.bottom_bordered}`}>
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
                <div className="content mb-5 is-flex is-align-items-center">
                  <button
                    className={classNames(`button ${s.cart_button}`, {
                      [`${s.active}`]: isProdInCart(product),
                    })}
                    type="button"
                    onClick={handleAddToCart}
                  >
                    {isProdInCart(product) ? 'Added to cart' : 'Add to cart'}
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
                          isProdInFavourites(product) ? faHeartSolid : faHeart
                        }
                      />
                    </span>
                  </button>
                </div>
                <ul className="list">
                  <li className="is-flex is-justify-content-space-between">
                    <span className={`is-size-7 ${s.product_gray}`}>
                      Screen
                    </span>
                    <b className="is-size-7">{productDetails?.screen}</b>
                  </li>
                  <li className="is-flex is-justify-content-space-between">
                    <span className={`is-size-7 ${s.product_gray}`}>
                      Resolution
                    </span>
                    <b className="is-size-7">{productDetails?.resolution}</b>
                  </li>
                  <li className="is-flex is-justify-content-space-between">
                    <span className={`is-size-7 ${s.product_gray}`}>
                      Processor
                    </span>
                    <b className="is-size-7">{productDetails?.processor}</b>
                  </li>
                  <li className="is-flex is-justify-content-space-between">
                    <span className={`is-size-7 ${s.product_gray}`}>RAM</span>
                    <b className="is-size-7">{productDetails?.ram}</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="fixed-grid has-1-cols-mobile has-1-cols-tablet has-2-cols-widescreen">
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
                          <span className={s.specs_text}>{el.title}</span>
                          <b className={s.specs__info}>{el.key}</b>
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={`${s.absolute_wrapper}`}>
        <h2 className={`title mb-0 ${s.home_titles} ${s.absolute_title}`}>
          You may also like
        </h2>
        <GoodsSlider collectionType={'alsoLike'} typePagin={'light'} />
      </div>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocation, Link, useParams } from 'react-router-dom';
import { Product } from '../../type/Product';
import { ProductItem } from '../../type/ProductItem';
import BlockBuyBtn from '../BlockBuyBtn';
import Card from '../Card';
import { getItemProduct, getProducts } from '../../server/fetchJson';
import './ProductPage.scss';

const handGoBack = () => {
  window.history.back();
};

export const ProductPage = () => {
  const [product, setProduct] = useState<ProductItem>();
  const [activeImg, setActiveImg] = useState<string>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [countBrand, setCountBrand] = useState(0);

  const location = useLocation();
  const arrLocation = location.pathname.split('/').filter(l => l !== '');
  const { id } = useParams();

  const nextSlide = (
    set:React.Dispatch<React.SetStateAction<number>>,
    arr:Product[],
  ) => {
    set((count) => {
      return count === arr.length - 1 ? 0 : count + 1;
    });
  };

  const prevSlide = (
    set: React.Dispatch<React.SetStateAction<number>>,
    arr: Product[],
  ) => {
    set((count: number) => {
      return count === 0 ? arr.length - 1 : count - 1;
    });
  };

  useEffect(() => {
    getProducts()
      .then(prod => setAllProducts(prod));
  }, []);

  useEffect(() => {
    getItemProduct(id)
      .then(prod => {
        setProduct(prod);
        setActiveImg(prod.images[0]);
      });
  }, [id]);

  const nextImg = (img: string, arr: string[]) => {
    const checked = arr.findIndex(imges => imges === img) === arr.length - 1;

    return checked ? arr[0] : arr[arr.findIndex(imges => imges === img) + 1];
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (product && activeImg) {
        setActiveImg(nextImg(activeImg, product.images));
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [product, activeImg]);

  let blockWidth = 0;
  let mediaV = 0;

  for (let i = 1; i < 5; i += 1) {
    mediaV += 288;

    if (window.matchMedia(`(min-width: ${mediaV}px)`).matches === true) {
      blockWidth = i;
    }
  }

  const findItem = allProducts.find(item => item.id === id);
  const discontPrice = findItem && findItem.price
  - findItem.price * (findItem.discount / 100);

  return (
    <>
      <div className="breadcrumbs">
        <Link to="/home" className="breadcrumbs__home" />

        <span className="breadcrumbs__arrow" />

        {arrLocation.map(l => (
          <span key={l} className="breadcrumbs__block">
            <Link to={{ pathname: `/${l}` }} className="breadcrumbs__location">
              {l.slice(0, 1).toUpperCase() + l.slice(1)}
            </Link>

            {l !== arrLocation[arrLocation.length - 1] && (
              <span className="breadcrumbs__arrow" />
            )}
          </span>
        ))}
      </div>

      <div className="breadcrumbs__back">
        <span className="breadcrumbs__arrow breadcrumbs__arrow--back" />

        <button
          className="breadcrumbs__go-back"
          onClick={handGoBack}
          type="button"
        >
          Back
        </button>
      </div>
      {product && (
        <>
          <h1 className="main__section--title">
            {product.name}
          </h1>

          <div className="product">
            <section className="product__block-imgs">
              <div className="product__all-imgs">
                {product.images.map(img => (
                  <button
                    key={img}
                    className={classNames(
                      'product__block-img',
                      { active: activeImg === img },
                    )}
                    type="button"
                    onClick={() => setActiveImg(img)}
                  >
                    <img src={img} alt="img" className="product__img" />
                  </button>
                ))}
              </div>
              <div className="product__active-img">
                <img src={activeImg} alt="" />
              </div>
            </section>

            <section className="product__block info">
              <div className="product__buy-block">
                <div className="product__price">
                  {findItem && findItem.discount === 0 ? (
                    findItem.price
                  ) : findItem && (
                    <>
                      {`$${discontPrice}`}
                      <span className="card__price--sale">
                        {findItem.price}
                      </span>
                    </>
                  )}
                </div>

                <div className="product__buy">
                  {findItem && (<BlockBuyBtn item={findItem} />)}
                </div>
              </div>

              <ul className="product__charac">
                <li className="product__charac-item">
                  <span className="product__spec">Screen</span>

                  <span className="product__value">
                    {product.display.screenSize}
                  </span>
                </li>

                <li className="product__charac-item">
                  <span className="product__spec">Resolution</span>

                  <span className="product__value">
                    {product.display.screenResolution}
                  </span>
                </li>

                <li className="product__charac-item">
                  <span className="product__spec">Processor</span>

                  <span className="product__value">
                    {product.hardware.cpu}
                  </span>
                </li>

                <li className="product__charac-item">
                  <span className="product__spec">RAM</span>

                  <span className="product__value">
                    {product.storage.ram}
                  </span>
                </li>
              </ul>
            </section>

            <section className="about product__block">
              <div className="about__head">
                <h2 className="about__main-title">About</h2>
              </div>

              <div className="description__text">
                {product.description}
              </div>
            </section>

            <section className="product__block tech-specs">
              <div className="about__head">
                <h2 className="about__main-title">Tech specs</h2>
              </div>

              <ul className="tech-specs__list">
                <li className="tech-specs__item">
                  <span className="tech-specs__spec">Screen</span>

                  <span className="tech__specs__value">
                    {product.display.screenSize}
                  </span>
                </li>

                <li className="tech-specs__item">
                  <span className="tech-specs__spec">Resolution</span>

                  <span className="tech__specs__value">
                    {product.display.screenResolution}
                  </span>
                </li>

                <li className="tech-specs__item">
                  <span className="tech-specs__spec">Processor</span>

                  <span className="tech__specs__value">
                    {product.hardware.cpu}
                  </span>
                </li>

                <li className="tech-specs__item">
                  <span className="tech-specs__spec">RAM</span>

                  <span className="tech__specs__value">
                    {product.storage.ram}
                  </span>
                </li>

                <li className="tech-specs__item">
                  <span className="tech-specs__spec">Built in memory</span>

                  <span className="tech__specs__value">
                    {product.storage.flash}
                  </span>
                </li>

                <li className="tech-specs__item">
                  <span className="tech-specs__spec">Camera</span>
                  <span className="tech__specs__value">
                    {product.camera.primary}
                  </span>
                </li>

                <li className="tech-specs__item">
                  <span className="tech-specs__spec">Zoom</span>

                  <span className="tech__specs__value" />
                </li>

                <li className="tech-specs__item">
                  <span className="tech-specs__spec">Cell</span>

                  <span className="tech-specs__value">
                    {`${product.connectivity.cell}`}
                  </span>
                </li>
              </ul>
            </section>
          </div>

          <div className="recommended">
            <div className="main__head">
              <h2 className="main__section--title">
                You may also like
              </h2>

              <div className="btn__block">
                <button
                  className="btn btn--prev"
                  onClick={() => prevSlide(setCountBrand, allProducts)}
                  disabled={countBrand === 0}
                  aria-label="btn-prev"
                  type="button"
                />

                <button
                  className="btn btn--next"
                  onClick={() => nextSlide(setCountBrand, allProducts)}
                  disabled={countBrand === allProducts.length - blockWidth}
                  aria-label="btn-next"
                  type="button"
                />
              </div>
            </div>

            <div className="card__wrapper">
              <div className="card__block">
                <ul className="card__list" style={{ transform: `translateX(-${countBrand * 288}px)` }} data-cy="cardContainer">
                  {allProducts.map(prod => (
                    <Card product={prod} key={prod.id} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

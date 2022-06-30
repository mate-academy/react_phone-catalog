/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as productsApi from '../../api/api';

import { Address } from '../../components/Address';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductSlider } from '../../components/ProductSlider';
import { Back } from '../../components/Back';
import { ProductNotFound } from '../../components/ProductNotFound';

import './ProductDetailsPage.scss';

type Props = {
  products: Product[],
};

export const ProductDetailsPage: React.FC<Props> = ({ products }) => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedProduct, setSelectedProduct]
    = useState<SelectedProduct | undefined>();
  const [selectedImg, setSelectedImg] = useState<string | undefined>();
  const [analogs, setAnalogs] = useState<Product[]>([]);
  const index = 0;
  const [added, setAdded] = useState(false);
  const [like, setLike] = useState(false);
  const location = useLocation();
  const founded = products.some((product) => product.id === productId);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const lastPath = location.pathname.split('/').pop();

    if (lastPath) {
      setAdded(keys.includes(`cart-${lastPath}`));
      setLike(keys.includes(`fav-${lastPath}`));
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedProduct) {
      const choosenProduct = products.find(
        (product) => product.id === selectedProduct?.id,
      );

      if (choosenProduct && event.currentTarget.name === 'cart') {
        setAdded(true);
        localStorage.setItem(`cart-${selectedProduct.id}`, JSON.stringify({
          id: choosenProduct.age,
          quantity: 1,
          product: choosenProduct,
        }));
      }

      if (choosenProduct && event.currentTarget.name === 'fav' && !like) {
        setLike(true);
        localStorage.setItem(`fav-${selectedProduct.id}`, JSON.stringify(choosenProduct));
      }

      if (choosenProduct && event.currentTarget.name === 'fav' && like) {
        setLike(false);
        localStorage.removeItem(`fav-${selectedProduct.id}`);
      }
    }
  };

  const additionalInfo = products.find(
    (product) => product.id === selectedProduct?.id,
  );

  let fullPrice = 0;
  let discountPrice = 0;

  if (additionalInfo) {
    fullPrice = additionalInfo.price;
    discountPrice = fullPrice - (additionalInfo.discount * fullPrice) / 100;
  }

  useEffect(() => {
    productsApi.getSelectedProduct(productId)
      .then((product) => {
        return (
          setSelectedProduct(product),
          setSelectedImg(product.images[0])
        );
      });
    productsApi.getSuggestedProducts()
      .then((items: Product[]) => {
        return (
          setAnalogs(items)
        );
      });
  }, [productId]);

  const handleChangeImage = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    setSelectedImg(event.currentTarget.id);
  };

  return (
    <div className="ProductDetails">
      <Header />
      {founded ? (
        <div className="wrapper">
          <div className="ProductDetails__nav">
            <Address />
            <Back />
          </div>
          <h1 className="ProductDetails__title">
            {selectedProduct?.name}
          </h1>
          <div className="ProductDetails__content">
            <div className="ProductDetails__images">
              {selectedProduct?.images.map((image) => {
                return (
                  <img
                    onClick={handleChangeImage}
                    id={image}
                    src={`${image}`}
                    alt={productId}
                    key={image}
                    className={
                      classNames(
                        'ProductDetails__images-item',
                        {
                          'ProductDetails__images-item--active':
                            image === selectedImg,
                        },
                      )
                    }
                  />
                );
              })}
            </div>
            <div className="ProductDetails__selected">
              <img src={`${selectedImg}`} alt={productId} />
            </div>
            <div className="ProductDetails__cart">
              <div className="ProductDetails__prices">
                {discountPrice === fullPrice && (
                  <p className="ProductDetails__prices-full">{`$${fullPrice}`}</p>
                )}
                {discountPrice !== fullPrice && (
                  <>
                    <p className="ProductDetails__prices-full">{`$${discountPrice}`}</p>
                    <p className="ProductDetails__prices-discount">{`$${fullPrice}`}</p>
                  </>
                )}

              </div>
              <div className="ProductDetails__buttons">
                {!added ? (
                  <button
                    name="cart"
                    onClick={handleClick}
                    type="button"
                    className="main-button
                      ProductDetails__button"
                  >
                    Add to cart
                  </button>
                )
                  : (
                    <button
                      disabled
                      type="button"
                      className="main-button
                        ProductDetails__button"
                    >
                      Added to cart
                    </button>
                  )}
                {!like ? (
                  <button
                    name="fav"
                    onClick={handleClick}
                    type="button"
                    className="
                    button
                    button--heart
                    button--heart--big
                    "
                  />
                ) : (
                  <button
                    name="fav"
                    onClick={handleClick}
                    type="button"
                    className="
                    button
                    button--heart
                    button--heart--disabled
                    button--heart--big
                    "
                  />
                )}

              </div>

              <div className="ProductDetails__info">
                <div className="ProductDetails__info-screen">
                  <p className="ProductDetails__info-text">Screen</p>
                  <p className="ProductDetails__info-value">
                    {additionalInfo?.screen}
                  </p>
                </div>
                <div className="ProductDetails__info-resolution">
                  <p className="ProductDetails__info-text">Resolution</p>
                  <p className="ProductDetails__info-value">
                    {selectedProduct?.display.screenResolution}
                  </p>
                </div>
                <div className="ProductDetails__info-processor">
                  <p className="ProductDetails__info-text">Processor</p>
                  <p className="ProductDetails__info-value">
                    {selectedProduct?.hardware.cpu}
                  </p>
                </div>
                <div className="ProductDetails__info-ram">
                  <p className="ProductDetails__info-text">RAM</p>
                  <p className="ProductDetails__info-value">
                    {selectedProduct?.storage.ram}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="ProductDetails__description">
            <div className="ProductDetails__description-info">
              <h2>About</h2>
              <p className="ProductDetails__description-text">
                {selectedProduct?.description}
              </p>
            </div>

            <div className="ProductDetails__description-tech">
              <h2>Tech specs</h2>
              <div className="ProductDetails__description-tech-screen">
                <p className="ProductDetails__description-tech-screen-text">
                  Screen
                </p>
                <p className="ProductDetails__description-tech-screen-value">
                  {additionalInfo?.screen}
                </p>
              </div>
              <div className="ProductDetails__description-tech-resolution">
                <p className="ProductDetails__description-tech-resolution-text">
                  Resolution
                </p>
                <p
                  className="ProductDetails__description-tech-resolution-value"
                >
                  {selectedProduct?.display.screenResolution}
                </p>
              </div>
              <div className="ProductDetails__description-tech-processor">
                <p className="ProductDetails__description-tech-processor-text">
                  Processor
                </p>
                <p className="ProductDetails__description-tech-processor-value">
                  {selectedProduct?.hardware.cpu}
                </p>
              </div>
              <div className="ProductDetails__description-tech-ram">
                <p className="ProductDetails__description-tech-ram-text">
                  RAM
                </p>
                <p className="ProductDetails__description-tech-ram-value">
                  {selectedProduct?.storage.ram}
                </p>
              </div>
            </div>
          </div>

          <div className="ProductDetails__analogs">
            <h1>You may also like</h1>
            <div className="ProductDetails__analogs-products">
              <ProductSlider
                products={analogs}
                index={index}
              />
            </div>
          </div>
        </div>
      ) : (
        <ProductNotFound />
      )}

      <Footer />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { getDetails, getProducts } from '../../../helpers/api';
import './ProductPage.scss';
import GadgetInformation from '../GadgetInformation/GadgetInformation';
import MiniSlider from '../MiniSlider/MiniSlider';
import BreadCrumbs from '../../BreadCrumbs/BreadCrumbs';
import ButtonBack from '../../button-back/ButtonBack';
import CartButton from '../CartButton/CartButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import Spinner from '../../Spinner/Spinner';

type Props = {
  currentProduct: string;
};

const ProductPage: React.FC<Props> = ({ currentProduct }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState<GadgetDetail>();
  const [currentProductInformation, setCurrentProductInformation] = useState<Gadget>({
    age: 0,
    id: '',
    type: '',
    imageUrl: '',
    name: '',
    snippet: '',
    price: 0,
    discount: 0,
    screen: '',
    capacity: '',
    ram: '',
    count: 0,
  });
  const [preparedPhones, setPreparedPhones] = useState<Gadget[]>([]);
  const [currentImg, setcurrentImg] = useState<string>();

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(data => setCurrentProductInformation(data
        .find((item: Gadget) => item.id === currentProduct)));
    getDetails(currentProduct)
      .then(setProductDetail);
    getProducts()
      .then(setPreparedPhones);
    setTimeout(() => setIsLoading(false), 500);
  }, [currentProduct]);

  useEffect(() => {
    setcurrentImg((currentProductInformation
      && currentProductInformation.imageUrl) || '');
  }, [currentProductInformation]);

  const onHandleClickImg = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLImageElement;

    setcurrentImg(target.src);
  };

  const priceWithDiscount = currentProductInformation
    && currentProductInformation.price
    - (currentProductInformation.price
      * (currentProductInformation.discount / 100));

  if (isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="product-page">
      <div className="product-page__bread-crumbs">
        <BreadCrumbs />
      </div>
      <div className="product-page__button-back">
        <ButtonBack />
      </div>
      <div className="product-description">
        <h3 className="product-description__title">
          {currentProductInformation && currentProductInformation.name}
        </h3>

        <div className="product-description__main-block main-block">
          <div className="gallery">
            {productDetail && productDetail.images.map(photo => (
              <button
                className="gallery__img-button"
                key={photo}
                type="button"
                onClick={(event) => onHandleClickImg(event)}
              >
                <img
                  src={photo}
                  className="gallery__img"
                  alt="gallery"
                />
              </button>
            ))}
          </div>

          <div className="main-block__img">
            <img
              src={currentImg}
              alt={currentProductInformation
              && currentProductInformation.name}
            />
          </div>

          <div className="main-block__description">

            <span className="gadget__price">
              <p className="gadget__price-discount">
                {`$${priceWithDiscount}`}
              </p>

              <p className="gadget__price-value">
                {(currentProductInformation
                  && currentProductInformation.price === priceWithDiscount)
                  ? '' : (`$${currentProductInformation
                  && currentProductInformation.price}`)}
              </p>
            </span>

            <div className="description gadget__description">
              <span className="characteristic__span">
                <span>
                  Screen
                </span>

                <span>
                  {currentProductInformation
                  && currentProductInformation.screen}
                </span>
              </span>

              <span className="characteristic__span">
                <span>
                  Capacity
                </span>

                <span>
                  {currentProductInformation
                  && currentProductInformation.capacity}
                </span>
              </span>

              <span className="characteristic__span">
                <span>
                  RAM
                </span>

                <span>
                  {currentProductInformation
                  && currentProductInformation.ram}
                </span>
              </span>
            </div>
            <div className="gadget__button">
              <CartButton gadget={currentProductInformation} />

              <FavoriteButton gadget={currentProductInformation} />
            </div>
          </div>
        </div>

        <div className="other-block">
          <div className="other-block__description">
            <h4 className="other-block__text">
              About
            </h4>

            <h4 className="other-block__text-description">
              And then there was Pro
            </h4>

            <p>
              {productDetail && productDetail.description}
            </p>

            <h4 className="other-block__text-description">
              Camera
            </h4>

            <p>
              {productDetail && productDetail.additionalFeatures}
            </p>

            <h4 className="other-block__text-description">
              Shoot it. Flip it. Zoom it. Tweak it. Love it
            </h4>

            <p>
              Epic processing power means it can shoot
              4K video with extended dynamic range and cinematic
              video stabilization — all at 60 fps. You get more
              creative control, too, with four times more scene
              and powerful new editing tools to play with.
            </p>
          </div>

          <div className="other-block__specification">
            <h4 className="other-block__text">
              Tech specs
            </h4>

            <div className="description product__description">
              <GadgetInformation
                title="OS"
                moreInfo={productDetail && productDetail.android?.os}
              />
              <GadgetInformation
                title="Hardware"
                moreInfo={productDetail && productDetail.hardware.cpu}
              />
              <GadgetInformation
                title="RAM"
                moreInfo={currentProductInformation
                && currentProductInformation.ram}
              />
              <GadgetInformation
                title="Display"
                moreInfo={productDetail
                && productDetail.display.screenResolution}
              />
              <GadgetInformation
                title="Camera Primary"
                moreInfo={productDetail && productDetail.camera.primary}
              />
              <GadgetInformation
                title="Camera Zoom"
                moreInfo={productDetail && (productDetail.camera.zoom
                  || 'Not avaible')}
              />
              <GadgetInformation
                title="Battery"
                moreInfo={productDetail && productDetail.battery?.type}
              />
              <GadgetInformation
                title="Storage"
                moreInfo={productDetail && productDetail.storage?.flash}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="product-page-slider">
        <MiniSlider gadgets={preparedPhones} name="You may also like" />
      </div>
    </div>
  );
};

export default ProductPage;

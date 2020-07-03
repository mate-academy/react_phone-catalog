import React, { useContext, useEffect, useState } from 'react';
import '../../../App.scss';
import './styleProductInfo.scss';
import '../ProductCard/ProductCard.scss';
import { FavProductsContext } from '../../Favourite/FavProductsContext';
import { CartContext } from '../../Cart/CartContext';
import { ProductCarousel } from '../../ProductCarousel';
import { BreadCrumbs } from '../../BreadCrumbs';
import { getDetails } from '../../../api/api';

type Props = {
  id: string;
  product: ProductItem;
};

interface ProductDetails {
  additionalFeatures: string;
  android: {
    os: string;
    ui: string;
  };
  availability: string[];
  battery: {
    standbyTime: string;
    talkTime: string;
    type: string;
  };
  camera: {
    features: string[];
    primary: string;
  };
  connectivity: {
    bluetooth: string;
    cell: string;
    gps: boolean;
    infrared: boolean;
    wifi: string;
  };
  description: string;
  display: {
    screenResolution: string;
    screenSize: string;
    touchScreen: boolean;
  };
  hardware: {
    accelerometer: boolean;
    audioJack: string;
    cpu: string;
    fmRadio: boolean;
    physicalKeyboard: boolean;
    usb: string;
  };
  images: string[];
  name: string;
  sizeAndWeight: {
    dimensions: string[];
    weight: string;
  };
  storage: {
    flash: string;
    ram: string;
  };
  id: string;
}

export const ProductInfo: React.FC<Props> = ({
  product,
  id,
}) => {
  const { addToFav, removeFav, isFavourite } = useContext(FavProductsContext);
  const { addToCart, removeFromCart, isAdded } = useContext(CartContext);
  const priceWithDiscount = product.price - ((product.price * product.discount) / 100);
  const [arrayPhotos, setArrayPhotos] = useState([]);
  const [dataOfProduct, setDataOfProduct] = useState<ProductDetails>();
  const [capacity, setCapacity] = useState('');
  const [currentImg, setCurrentImg] = useState('');

  useEffect(() => {
    getDetails(id)
      .then(data => {
        setDataOfProduct(data);
        setCapacity(data.storage.flash);
        setArrayPhotos(data.images);
        setCurrentImg(data.images[0]);
      });
  }, []);

  return (
    <section className="productsInfo">
      <div className="container">
        <BreadCrumbs />
        <h2 className="productsInfo__title">
          {dataOfProduct ? dataOfProduct.name : ''}
        </h2>
        <div className="productsInfo__parts">
          <div className="productsInfo__left">
            <div className="productsInfo__handleImgs">
              <div className="handleImgs__list">
                {arrayPhotos.map((item, index) => (
                  <button key={index} className="handleImgs__item" onClick={() => setCurrentImg(item)}>
                    <img className="handleImgs__img" src={item} alt="product" />
                  </button>
                ))}
              </div>
              <img className="handleImgs__bigImg" src={currentImg} alt="product" />
            </div>
            <p className="productsInfo__section">About</p>
            <div className="description">
              <p className="description__title">And then there was Pro</p>
              <p className="description__text">
                {dataOfProduct ? dataOfProduct.description : ''}
              </p>
            </div>
            <div className="description">
              <p className="description__title">Camera</p>
              <p className="description__text">
                {dataOfProduct ? dataOfProduct.additionalFeatures : ''}
              </p>
            </div>
            <div className="description">
              <p className="description__title">Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.</p>
              <p className="description__text">
                {dataOfProduct ? dataOfProduct.description : ''}
              </p>
            </div>
          </div>
          <div className="productsInfo__right">
            <div className="productsInfo__mainInfo">
              <div className="productsInfo__id">
                <span className="lightText">Available colors</span>
                <span className="lightText">
                  ID:
                  {' '}
                  {product.age}
                </span>
              </div>
              <div className="productsInfo__colors">
                <ul className="colors__list">
                  <button type="button" className="colors__item colors__item--pink" />
                  <button type="button" className="colors__item colors__item--grey" />
                  <button type="button" className="colors__item colors__item--white" />
                  <button type="button" className="colors__item colors__item--dark" />
                </ul>
              </div>
              <div className="productsInfo__memory">
                <span className="lightText">Select capacity</span>
                <ul className="memory__list">
                  <button type="button" className="memory__item" onClick={() => setCapacity('64 GB')}>64 GB</button>
                  <button type="button" className="memory__item" onClick={() => setCapacity('128 GB')}>128 GB</button>
                  <button type="button" className="memory__item" onClick={() => setCapacity('256 GB')}>256 GB</button>
                </ul>
              </div>
              <div className="productsInfo__shortСharacteristics">
                <div className="productsInfo__price">
                  <span className="productsInfo__MainPrice">${product.price} </span>
                  <span className="productsInfo__CeilPrice">
                    {product.price === priceWithDiscount ? '' : `$${priceWithDiscount}`}
                  </span>
                </div>
                <div className="card__buttons button">
                  <button
                    className={isAdded(product)
                      ? 'button__cart button__cart--added'
                      : 'button__cart'}
                    type="button"
                    onClick={() => {
                      if (isAdded(product)) {
                        removeFromCart(product);
                      } else {
                        addToCart(product);
                      }
                    }}
                  >
                    {isAdded(product) ? 'Remove from cart' : 'Add to cart'}
                  </button>
                  <label
                    className={isFavourite(product)
                      ? 'button__favorite button__favorite--checked'
                      : 'button__favorite'}
                    htmlFor={`button__favorite--${product.id}`}
                  >
                    <input
                      className="button__favorite--input"
                      type="checkbox"
                      checked={isFavourite(product)}
                      id={`button__favorite--${product.id}`}
                      onChange={(event) => {
                        if (event.target.checked) {
                          addToFav(product);
                        } else {
                          removeFav(product);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="productsInfo__info">
                  <ul className="productsInfo__infoList">
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        Screen
                      </span>
                      <span className="value">
                        {dataOfProduct ? dataOfProduct.display.screenResolution : ''}
                      </span>
                    </li>
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        Android
                      </span>
                      <span className="value">
                        {dataOfProduct ? dataOfProduct.android.os : ''}
                      </span>
                    </li>
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        Battery
                      </span>
                      <span className="value">
                        {dataOfProduct ? dataOfProduct.battery.type : ''}
                      </span>
                    </li>
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        Camera
                      </span>
                      <span className="value">
                        {dataOfProduct ? dataOfProduct.camera.primary : ''}
                      </span>
                    </li>
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        Capacity
                      </span>
                      <span className="value">
                        {dataOfProduct ? capacity : ''}
                      </span>
                    </li>
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        Processor
                      </span>
                      <span className="value">
                        {dataOfProduct ? dataOfProduct.hardware.cpu : ''}
                      </span>
                    </li>
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        RAM
                      </span>
                      <span className="value">
                        {dataOfProduct ? dataOfProduct.storage.ram : ''}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="productsInfo__techSpecs">
              <p className="productsInfo__section">
                Tech specs
              </p>
              <ul className="techSpecs__list">
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Android
                  </span>
                  <span className="techSpecs__value">
                    {dataOfProduct ? dataOfProduct.android.os : ''}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Availability
                  </span>
                  <span className="techSpecs__value">
                    {dataOfProduct ? dataOfProduct.availability.map((item, index) => <span key={index}>{item}</span>) : ''}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Battery
                  </span>
                  <span className="techSpecs__value">
                    {dataOfProduct ? dataOfProduct.battery.type : ''}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Camera
                  </span>
                  <span className="techSpecs__value">
                    {dataOfProduct ? dataOfProduct.camera.features.map((item, index) => <span key={index}>{item}, </span>) : ''}
                    {dataOfProduct ? dataOfProduct.camera.primary : ''}
                  </span>
                </li>

                {dataOfProduct ? Object.entries(dataOfProduct.connectivity).map((item, index) => (
                  <li key={index} className="techSpecs__item">
                    <span className="techSpecs__property">
                      {item[0]}
                    </span>
                    <span className="techSpecs__value">
                      {`${item[1]}` === 'true' ? 'Yes' : `${item[1]}` === 'false' ? 'No' : item[1]}
                    </span>
                  </li>
                )) : ''}

                {dataOfProduct ? Object.entries(dataOfProduct.display).map((item, index) => (
                  <li key={index} className="techSpecs__item">
                    <span className="techSpecs__property">
                      {item[0]}
                    </span>
                    <span className="techSpecs__value">
                      {`${item[1]}` === 'true' ? 'Yes' : `${item[1]}` === 'false' ? 'No' : item[1]}
                    </span>
                  </li>
                )) : ''}

                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Capacity
                  </span>
                  <span className="techSpecs__value">
                    {capacity}
                  </span>
                </li>

                {dataOfProduct ? Object.entries(dataOfProduct.hardware).map((item, index) => (
                  <li key={index} className="techSpecs__item">
                    <span className="techSpecs__property">
                      {item[0]}
                    </span>
                    <span className="techSpecs__value">
                      {`${item[1]}` === 'true' ? 'Yes' : `${item[1]}` === 'false' ? 'No' : item[1]}
                    </span>
                  </li>
                )) : ''}

                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Dimensions
                  </span>
                  <span className="techSpecs__value">
                    {dataOfProduct ? dataOfProduct.sizeAndWeight.dimensions.map((item, index) => (
                      <React.Fragment key={index}>
                        {
                          index === dataOfProduct.sizeAndWeight.dimensions.length - 1
                            ? <span>{item}</span>
                            : <span>{item}, </span>
                        }
                      </React.Fragment>
                    )) : ''}
                  </span>
                </li>

                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    RAM
                  </span>
                  <span className="techSpecs__value">
                    {dataOfProduct ? dataOfProduct.storage.ram : ''}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ProductCarousel wigthSlides={-101.55} title="You may also like" products={[product]} />

    </section>
  );
};

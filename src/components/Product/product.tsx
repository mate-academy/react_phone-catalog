import { useLocation, useParams } from 'react-router-dom';
import './product.scss'
import { useEffect, useState } from 'react';

export const Product = () => {
  const [productImages, setProductImages] = useState([]);
  const { productId } = useParams<{ productId: string }>();
  const [image, setImage] = useState<string>();
  const [colors, setColors] = useState([]);
  const [capacity, setCapacity] = useState([])
  const [productPrice, setProductPrice] = useState();
  const [productDiscount, setProductDiscount] = useState();
  const [productScreen, setProductScreen] = useState();
  const [productRam, setProductRam] = useState();
  const [productProcessor, setProductProcessor] = useState();
  const [productResolution, setProductResolution] = useState();
  const location = useLocation();


  useEffect(() => {
    if (productId) {
      let url = '';
      if (location.pathname.includes('/phones')) {
        url = './api/phones.json';
      } else if (location.pathname.includes('/tablets')) {
        url = './api/tablets.json';
      } else if (location.pathname.includes('/accessories')) {
        url = './api/accessories.json';
      }

      if (url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const product = data.find((item: any) => item.id === productId);
            if (product) {
              setProductImages(product.images);
              setImage(product.images[0]);
              setColors(product.colorsAvailable);
              setCapacity(product.capacityAvailable);
              setProductPrice(product.priceRegular);
              setProductDiscount(product.priceDiscount);
              setProductScreen(product.screen);
              setProductRam(product.ram);
              setProductProcessor(product.processor);
              setProductResolution(product.resolution);
            }
          });
      }
    }
  }, [productId, location.pathname]);

  const mainImage = (image: string) => {
    setImage(image);
  }
  return (
    <div>
      <section className="product">
        <div className="product__images">
          <div className="product__images__available">
            {productImages.map((image: string, index) => (
              <img
                key={index}
                src={image}
                className="product__images__available--image"
                onClick={() => mainImage(image)}
              ></img>
            ))}
          </div>
          <div className="product__images__image">
            <img
              src={image}
              alt=""
              className="product__images__image--main"
            />
          </div>
        </div>
        <div className="product__cart">
          <p className="product__cart__name">Available colors</p>
          <div className="product__cart__colors">
            {colors.map((color, index) => (
              <div
                className={
                  `product__cart__colors__color
                  product__cart__colors__color--${index}`
                }
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>

          <hr className="product__cart--line" />

          <p className="product__cart__name">Select capacity</p>
          <div className="product__cart__capacity">
            {capacity.map((capacity: string, index) => (
              <button
                className="product__cart__capacity--available"
                key={index}>
                {capacity}
              </button>
            ))}
          </div>

          <hr className="product__cart--line" />
          <div className="product__cart__prices">
            <h4 className="product__cart__prices__price">
              ${productDiscount}
            </h4>
            <h4 className="product__cart__prices__discount">
              ${productPrice}
            </h4>
          </div>
          <div className="product__cart__buttons">
            <button className="product__cart__buttons__button__add">
              Add to cart
            </button>
            <button className="product__cart__buttons__button__favourites">
              <span className="product__cart__buttons__button__favourites--heart"></span>
            </button>
          </div>
          <div className="product__cart__description">
            <p className="product__cart__description__screen">
              Screen
            </p>
            <p className="product__cart__description__screen--number">
              {productScreen}
            </p>
          </div>
          <div className="product__cart__description">
            <p className="product__cart__description__capacity">
              Resolution
            </p>
            <p className="product__cart__description__capacity--number">
              {productResolution}
            </p>
          </div>
          <div className="product__cart__description">
            <p className="product__cart__description__capacity">
              Processor
            </p>
            <p className="product__cart__description__capacity--number">
              {productProcessor}
            </p>
          </div>
          <div className="product__cart__description">
            <p className="product__cart__description__ram">RAM</p>
            <p className="product__cart__description__ram--number">
              {productRam}
            </p>
          </div>
        </div>

        <p className="product__id">ID: 802390</p>
      </section>
    </div>
  );
};
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './Product.module.scss';
import useAddToFavourite from '../../Hooks/UseAddToFavourite';

interface ProductProps {
  productScreen: string;
  productRam: string;
  productProcessor: string;
  productResolution: string;
  capacity: string[];
}

export const Product = ({
  productScreen,
  productRam,
  productProcessor,
  productResolution,
  capacity,
}: ProductProps) => {
  const [productImages, setProductImages] = useState([]);
  const { productId } = useParams<{ productId: string }>();
  const [image, setImage] = useState<string>();
  const [colors, setColors] = useState([]);
  const [productPrice, setProductPrice] = useState();
  const [productDiscount, setProductDiscount] = useState();
  const { favourites, toggleFavourite } = useAddToFavourite();
  const location = useLocation();

  const isFavourite = productId ? favourites.has(productId) : false;

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
          .then((response) => response.json())
          .then((data) => {
            const product = data.find((item: any) => item.id === productId);
            if (product) {
              setProductImages(product.images);
              setImage(product.images[0]);
              setColors(product.colorsAvailable);
              setProductPrice(product.priceRegular);
              setProductDiscount(product.priceDiscount);
            }
          });
      }
    }
  }, [productId, location.pathname]);

  const mainImage = (selectedImage: string) => {
    setImage(selectedImage);
  };

  return (
    <section className={`${style.product} ${style['product--margin']}`}>
      <div className={style.product__images}>
        <div className={style.product__images__available}>
          {productImages.map((img: string, index) => (
            <img
              key={index}
              src={img}
              alt={`thumbnail-${index}`}
              className={style['product__images__available--image']}
              onClick={() => mainImage(img)}
            />
          ))}
        </div>
        <div className={style.product__images__image}>
          <img
            src={image}
            alt="product"
            className={style['product__images__image--main']}
          />
        </div>
      </div>

      <div className={style.product__cart}>
        <div className={style.product__cart__top}>
          <p className={style.product__cart__top__name}>Available colors</p>
          <p className={style.product__cart__top__id}>ID: {productId}</p>
        </div>

        <div className={style.product__cart__colors}>
          {colors.map((color, index) => (
            <div
              key={index}
              className={style.product__cart__colors__color}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <hr className={style['product__cart--line']} />

        <p className={style.product__cart__top__name}>Select capacity</p>
        <div className={style.product__cart__capacity}>
          {capacity.map((cap: string, index) => (
            <button
              key={index}
              className={style['product__cart__capacity--available']}
            >
              {cap}
            </button>
          ))}
        </div>

        <hr className={style['product__cart--line']} />

        <div className={style.product__cart__prices}>
          <h4 className={style.product__cart__prices__price}>
            ${productDiscount}
          </h4>
          <h4 className={style.product__cart__prices__discount}>
            ${productPrice}
          </h4>
        </div>

        <div className={style.product__cart__buttons}>
          <button className={style.product__cart__buttons__button__add}>
            Add to cart
          </button>
          
          <button
            className={style.product__cart__buttons__button__favourites}
            onClick={() => productId && toggleFavourite(productId)}
          >
            <span
              className={`
                ${style['product__cart__buttons__button__favourites--heart']}
                ${isFavourite ? style['product__cart__buttons__button__favourites--heart--active'] : ''}
              `}
            />
          </button>
        </div>

        <div className={style.product__cart__description}>
          <p className={style.product__cart__description__screen}>Screen</p>
          <p className={style['product__cart__description__screen--number']}>
            {productScreen}
          </p>
        </div>

        <div className={style.product__cart__description}>
          <p className={style.product__cart__description__resolution}>
            Resolution
          </p>
          <p className={style['product__cart__description__resolution--number']}>
            {productResolution}
          </p>
        </div>

        <div className={style.product__cart__description}>
          <p className={style.product__cart__description__processor}>
            Processor
          </p>
          <p className={style['product__cart__description__processor--number']}>
            {productProcessor}
          </p>
        </div>

        <div className={style.product__cart__description}>
          <p className={style.product__cart__description__ram}>RAM</p>
          <p className={style['product__cart__description__ram--number']}>
            {productRam}
          </p>
        </div>
      </div>
    </section>
  );
};
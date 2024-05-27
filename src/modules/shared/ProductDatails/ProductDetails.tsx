import classNames from 'classnames';
import { useAppSelector } from '../hooks/hooks';
import styles from './ProductDetails.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ProductDetails = () => {
  const [borderImg, setBorderImg] = useState(0);
  const [indexColor] = useState(0);
  const [widthSlider, setWidthSlider] = useState(0);
  const widthPicture = document.getElementById('widthPicture')?.offsetWidth;

  const { productDetails } = useAppSelector(state => state.product);
  const choosePhoto = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number,
  ) => {
    e.preventDefault();

    if (widthPicture) {
      setWidthSlider(index * +widthPicture);
    }

    setBorderImg(index);
  };

  const changeProductByColor = (color: string) => {
    return `/${productDetails?.category}/${productDetails?.namespaceId}-${productDetails?.capacity.toLowerCase()}-${color.replaceAll(' ', '-')}`;
  };

  const findProdutByCapacity = (capacity: string) => {
    return `/${productDetails?.category}/${productDetails?.namespaceId}-${capacity.toLowerCase()}-${productDetails?.color.replaceAll(' ', '-')}`;
  };

  return (
    <>
      <div className={styles.product}>
        <h1 className={styles.product__title}>{productDetails?.name}</h1>
        <div className={styles.product__container}>
          <div className={styles.product__main}>
            <div className={styles.product__slider}>
              {productDetails?.images.map((img, index) => (
                <a onClick={e => choosePhoto(e, index)} href="" key={index}>
                  <img
                    className={classNames(styles.product__img, {
                      [styles.product__img__active]: borderImg === index,
                    })}
                    src={img}
                    alt="img"
                  />
                </a>
              ))}
            </div>

            <div className={styles.product__content}>
              <div className={styles.product__container__img}>
                <div
                  className={styles.product__translate}
                  style={{ transform: `translateX(-${widthSlider}px)` }}
                >
                  {productDetails?.images.map(item => (
                    <img
                      key={item}
                      id="widthPicture"
                      className={styles.product__picture}
                      src={item}
                      alt="Phone"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.product__choose}>
            <div className={styles.product__position}>
              <span className={styles.product__text_available}>
                Available colors
              </span>
              <span className={styles.product__text_available}>ID: 802390</span>
            </div>
            <div className={styles.product__available}>
              {productDetails?.colorsAvailable.map((item, index) => (
                <Link
                  to={{ pathname: `${changeProductByColor(item)}` }}
                  key={item}
                  style={{ backgroundColor: `${item}` }}
                  className={classNames(styles.product__color, {
                    [styles.product__color__active]: indexColor === index,
                  })}
                />
              ))}
            </div>
            <div className={styles.line}></div>

            <span className={styles.product__text_available}>
              Select capacity
            </span>
            <div className={styles.product__available}>
              {productDetails?.capacityAvailable.map(item => (
                <div
                  key={item}
                  className={classNames(styles.product__capacity__position, {
                    [styles.product__capacity__action]:
                      productDetails.capacity === item,
                  })}
                >
                  <Link
                    className={styles.product__capacity}
                    to={{ pathname: findProdutByCapacity(item) }}
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </div>
            <div className={styles.line}></div>

            <div className={styles.product__price}>
              <span className={styles.product__cost}>
                {`$${productDetails?.priceDiscount}`}
              </span>

              <span className={styles.product__discount}>
                {`$${productDetails?.priceRegular}`}
              </span>
            </div>

            <div className={styles.product__send}>
              <button className={styles.product__button}>Add to cart</button>

              <div className={styles.product__like}>
                <a className={styles.product__favorit} href=""></a>
              </div>
            </div>

            <div
              className={`${styles.product__descriptin} ${styles.product__display}`}
            >
              <div className={styles.product__descriptin}>
                <p className={styles.product__part}>Screen</p>

                <p className={`${styles.product__part} ${styles.phone__value}`}>
                  {productDetails?.screen}
                </p>
              </div>
              <div className={styles.product__descriptin}>
                <p className={styles.product__part}>Resolution</p>

                <p className={`${styles.product__part} ${styles.phone__value}`}>
                  {productDetails?.resolution}
                </p>
              </div>

              <div className={styles.product__descriptin}>
                <p className={styles.product__part}>Processor</p>

                <p className={`${styles.product__part} ${styles.phone__value}`}>
                  {productDetails?.processor}
                </p>
              </div>

              <div className={styles.product__descriptin}>
                <p className={styles.product__part}>RAM</p>

                <p className={`${styles.product__part} ${styles.phone__value}`}>
                  {productDetails?.ram}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.product__wraper}>
        <div className={styles.about}>
          <h3 className={styles.about__name}>About</h3>
          <div className={styles.about__line}></div>
          {productDetails?.description.map((item, index) => (
            <div key={index} className={styles.about__description}>
              <h4 className={styles.about__title}>{item.title}</h4>
              <p className={styles.about__text}>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.specs}>
          <h3 className={`${styles.about__name} ${styles.specs__title}`}>
            Tech specs
          </h3>
          <div
            className={`${styles.about__line} ${styles.specs__margin}`}
          ></div>
          <div className={styles.specs__container}>
            <div className={styles.specs__wraper}>
              <span className={styles.about__text}>Screen</span>
              <span className={styles.specs__description}>
                {productDetails?.screen}
              </span>
            </div>

            <div className={styles.specs__wraper}>
              <span className={styles.about__text}>Resolution</span>
              <span className={styles.specs__description}>
                {productDetails?.resolution}
              </span>
            </div>

            <div className={styles.specs__wraper}>
              <span className={styles.about__text}>Processor</span>
              <span className={styles.specs__description}>
                {productDetails?.processor}
              </span>
            </div>

            <div className={styles.specs__wraper}>
              <span className={styles.about__text}>RAM</span>
              <span className={styles.specs__description}>
                {productDetails?.ram}
              </span>
            </div>

            <div className={styles.specs__wraper}>
              <span className={styles.about__text}>Built in memory</span>
              <span className={styles.specs__description}>
                {productDetails?.capacity}
              </span>
            </div>

            <div className={styles.specs__wraper}>
              <span className={styles.about__text}>Camera</span>
              <span className={styles.specs__description}>
                {productDetails?.camera}
              </span>
            </div>

            <div className={styles.specs__wraper}>
              <span className={styles.about__text}>Zoom</span>
              <span className={styles.specs__description}>
                {productDetails?.zoom}
              </span>
            </div>

            <div className={styles.specs__wraper}>
              <span className={styles.about__text}>Cell</span>
              <span className={styles.specs__description}>
                {productDetails?.cell}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useState } from 'react';
import { Phones } from '../../types/Phones';
import styles from './productDetail.module.scss';
import classNames from 'classnames';
import { Smartwatch } from '../../types/Accessories';
import { Tablet } from '../../types/Tablets';

interface ProductDetailProps {
  selectedPhone: Phones | Smartwatch | Tablet | null;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  selectedPhone,
}) => {
  const [mainImage, setMainImage] = useState<string | undefined>(
    selectedPhone?.images[0],
  );

  const handleImageClick = (image: string | undefined) => {
    setMainImage(image);
  };

  return (
    <div className={classNames(styles.product, 'container')}>
      <h2>{selectedPhone?.name}</h2>

      <img
        src={mainImage}
        className={styles.product_img}
        alt={selectedPhone?.name}
      />
      <div className={styles.product_img_container}>
        {selectedPhone?.images.map(
          (image: string | undefined, index: React.Key | null | undefined) => (
            <img
              key={index}
              src={image}
              onClick={() => handleImageClick(image)}
              className={classNames({
                [styles.product_imgs]: true,
                [styles.black]: image === mainImage,
              })}
              alt={`Thumbnail`}
            />
          ),
        )}
      </div>

      <p>
        Available colors <span>ID: 843256</span>
      </p>
      <ul className={styles.product_colors}>
        {selectedPhone?.colorsAvailable.map((color, index) => {
          return (
            <li
              key={index}
              className={classNames({
                [styles.product_colors_item]: true,
                [styles.black]: selectedPhone.color === color,
              })}
            >
              <a
                href="/"
                className={styles.product_colors_link}
                style={{
                  backgroundColor: color === 'midnight' ? 'black' : color,
                }}
              ></a>
            </li>
          );
        })}
      </ul>
      <div className={styles.product_capacity_div}>
        <p className={styles.product_capacity_text}>Select capacity</p>
        <ul className={styles.product_capacity}>
          {selectedPhone?.capacityAvailable.map((capacity, index) => {
            return (
              <li key={index} className={styles.product_capacity_item}>
                <a
                  href="/"
                  className={classNames({
                    [styles.product_capacity_link]: true,
                    [styles.black_capacity]:
                      selectedPhone.capacity === capacity,
                  })}
                >
                  {capacity}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <section className={styles.buy}>
        <p className={styles.buy_priceD}>
          ${selectedPhone?.priceDiscount}
          <span className={styles.buy_priceR}>
            ${selectedPhone?.priceRegular}
          </span>
        </p>
        <div className={styles.buy_buttonDiv}>
          <button className={styles.buy_buttonBuy}>Add to cart</button>
          <button className={styles.buy_favor}>
            <span className={styles.buy_favor_icon}></span>
          </button>
        </div>
        <div className={styles.buy_text_cont}>
          <p className={styles.buy_text}>
            Screen
            <span className={styles.buy_span}>
              {selectedPhone?.screen.split(' ').slice(0, 2).join(' ')}
            </span>
          </p>
          <p className={styles.buy_text}>
            Resolution
            <span className={styles.buy_span}>{selectedPhone?.resolution}</span>
          </p>
          <p className={styles.buy_text}>
            Processor
            <span className={styles.buy_span}>{selectedPhone?.processor}</span>
          </p>
          <p className={styles.buy_text}>
            RAM <span className={styles.buy_span}>{selectedPhone?.ram}</span>
          </p>
        </div>
      </section>
      <section className={styles.about}>
        <h3 className={styles.about_title}>About</h3>

        {selectedPhone?.description.map((describe, index) => {
          return (
            <React.Fragment key={index}>
              <h3 className={styles.about_describe}>{describe.title}</h3>
              <p className={styles.about_text}>{describe.text}</p>
            </React.Fragment>
          );
        })}
      </section>
      <section className={styles.spec}>
        <h3 className={styles.spec_title}>Tech specs</h3>
        <ul className={styles.spec_list}>
          <li className={styles.spec_item}>
            Screen
            <span className={styles.spec_span}>{selectedPhone?.screen}</span>
          </li>
          <li className={styles.spec_item}>
            Resolution
            <span className={styles.spec_span}>
              {selectedPhone?.resolution}
            </span>
          </li>
          <li className={styles.spec_item}>
            Processor
            <span className={styles.spec_span}>{selectedPhone?.processor}</span>
          </li>
          <li className={styles.spec_item}>
            RAM <span className={styles.spec_span}>{selectedPhone?.ram}</span>
          </li>
          <li className={styles.spec_item}>
            Built in memory
            <span className={styles.spec_span}>{selectedPhone?.capacity}</span>
          </li>
          <li className={styles.spec_item}>
            Camera
            <span className={styles.spec_span}>{selectedPhone?.camera}</span>
          </li>
          <li className={styles.spec_item}>
            Zoom <span className={styles.spec_span}>{selectedPhone?.zoom}</span>
          </li>
          <li className={styles.spec_item}>
            Cell
            <span className={styles.spec_span}>
              {selectedPhone?.cell.join(', ')}
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
};

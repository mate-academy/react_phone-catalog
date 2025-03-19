import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { Phones } from '../../types/Phones';
import { Tablets } from '../../types/Tablets';
import { Accessories } from '../../types/Accessories';

import styles from './ProductDetailsPage.module.scss';
import homeIcon from '../../imgs/svg/home-icon.svg';
import arrowRight from '../../imgs/svg/arrow-right-icon.svg';
import arrowLeft from '../../imgs/svg/arrow-left-icon.svg';

type Product = Phones | Tablets | Accessories;

const colorMap: { [key: string]: string } = {
  black: '#000000',
  green: '#27ae60',
  yellow: '#ffdf00',
  white: '#ffffff',
  purple: '#800080',
  red: '#eb5757',
  gold: '#ffd700',
  silver: '#c0c0c0',
  midnightgreen: '#004953',
  spacegray: '#404040',
  rosegold: '#ffb6c1',
  coral: '#ff7f50',
  skyblue: '#87ceeb',
  starlight: '#fffaf0',
  pink: '#ffc0cb',
  blue: '#0000ff',
  midnight: '#191970',
  graphite: '#a9a9a9',
  sierrablue: '#4682b4',
  spaceblack: '#000000',
  'space gray': '#404040',
};

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const allProducts: Product[] = [...phones, ...tablets, ...accessories];
  const product = allProducts.find(item => item.id === id);

  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');

  if (!product) {
    return <div>Продукт не знайдено</div>;
  }

  return (
    <div className={styles.product}>
      <div className={styles.product__icons}>
        <NavLink className={styles.product__icons_link} to="/">
          <img
            src={homeIcon}
            alt="Home"
            className={styles.product__icons_home}
          />
        </NavLink>
        <img
          src={arrowRight}
          alt="arrow-right"
          className={styles.product__icons_arrow}
        />
        <NavLink
          className={styles.product__icons_link}
          to={`/${product.category}`}
        >
          <span className={styles.product__icons_category}>
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </span>
        </NavLink>

        <img
          src={arrowRight}
          alt="arrow-right"
          className={styles.product__icons_arrow}
        />
        <span className={styles.product__icons_product}>{product.name}</span>
      </div>
      <NavLink to={`/${product.category}`} className={styles.product__back}>
        <img
          className={styles.product__back_img}
          src={arrowLeft}
          alt="arrow-left"
        />
        <span className={styles.product__back_text}>Back</span>
      </NavLink>
      <h2 className={styles.product__title}>{product.name}</h2>
      <div className={styles.product__gallery}>
        <div className={styles.product__gallery_main}>
          <img
            className={styles.product__gallery_main_img}
            src={`/${selectedImage}`}
            alt="Selected product"
          />
        </div>
        <div className={styles.product__gallery_thumbnails}>
          {product.images.map(image => (
            <img
              key={image}
              src={`/${image}`}
              alt="Thumbnail"
              className={`${styles.product__gallery_thumbnail} ${
                selectedImage === image ? styles.active : ''
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.product__controls}>
        <div className={styles.product__controls_colors}>
          <p className={styles.product__controls_colors_title}>
            Available colors
          </p>
          <div className={styles.product__controls_colors_buttons}>
            {product.colorsAvailable.map(color => (
              <button
                key={color}
                type="button"
                className={styles.product__controls_colors_button}
                style={{ backgroundColor: colorMap[color] }}
              ></button>
            ))}
          </div>
        </div>
      </div>
      <p>
        Ціна: ${product.priceDiscount} (Звичайна ціна: ${product.priceRegular})
      </p>
      <div className={styles.product__description}>
        <h3 className={styles.product__description_title}>About</h3>
        {product.description.map(desc => (
          <div className={styles.product__description_block} key={desc.title}>
            <h4 className={styles.product__description_block_title}>
              {desc.title}
            </h4>
            {desc.text.map((text, index) => (
              <p className={styles.product__description_block_text} key={index}>
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.product__techSpecs}>
        <h3 className={styles.product__techSpecs_title}>Tech Specs</h3>
        <div className={styles.product__techSpecs_block}>
          <p className={styles.product__techSpecs_name}>
            Screen
            <span className={styles.product__techSpecs_value}>
              {product.screen}
            </span>
          </p>
          <p className={styles.product__techSpecs_name}>
            Resolution
            <span className={styles.product__techSpecs_value}>
              {product.resolution}
            </span>
          </p>
          <p className={styles.product__techSpecs_name}>
            Processor
            <span className={styles.product__techSpecs_value}>
              {product.processor}
            </span>
          </p>
          <p className={styles.product__techSpecs_name}>
            RAM
            <span className={styles.product__techSpecs_value}>
              {product.ram}
            </span>
          </p>
          <p className={styles.product__techSpecs_name}>
            Built in memory
            <span className={styles.product__techSpecs_value}>
              {product.capacity}
            </span>
          </p>
          {product.camera && (
            <p className={styles.product__techSpecs_name}>
              Camera
              <span className={styles.product__techSpecs_value}>
                {product.camera}
              </span>
            </p>
          )}
          {product.zoom && (
            <p className={styles.product__techSpecs_name}>
              Zoom
              <span className={styles.product__techSpecs_value}>
                {product.zoom}
              </span>
            </p>
          )}
          <p className={styles.product__techSpecs_name}>
            Cell
            <span className={styles.product__techSpecs_value}>
              {product.cell.slice(0, 3).join(', ')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

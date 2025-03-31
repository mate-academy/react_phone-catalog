import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { ToggleButton } from '../../components/ToggleButton/ToggleButton';
import { ProductSwiper } from '../../components/ProductSwiper';
import classNames from 'classnames';

import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import products from '../../../public/api/products.json';

import { Phones } from '../../types/Phones';
import { Tablets } from '../../types/Tablets';
import { Accessories } from '../../types/Accessories';
import { useCart } from '../../context/CartContext';
import { colorMap } from '../../types/colorMap';

import styles from './ProductDetailsPage.module.scss';
import homeIcon from '../../imgs/svg/home-icon.svg';
import arrowRight from '../../imgs/svg/arrow-right-icon.svg';
import arrowLeft from '../../imgs/svg/arrow-left-icon.svg';

type ProductType = Phones | Tablets | Accessories;

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, favorites } = useCart();
  const allProducts: ProductType[] = React.useMemo(
    () => [...phones, ...tablets, ...accessories],
    [],
  );
  const product = allProducts.find(item => item.id === id);
  const realProduct = products.find(prod => prod.itemId === id);
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.color || '');
  const [selectedCapacity, setSelectedCapacity] = useState(
    product?.capacity || '',
  );

  const isInCart = cart.some(item => item.itemId === product?.id);
  const isInFavorites = favorites.some(item => item.itemId === product?.id);

  useEffect(() => {
    const newProduct = allProducts.find(
      p =>
        p.namespaceId === product?.namespaceId &&
        p.color === selectedColor &&
        p.capacity === selectedCapacity,
    );

    if (newProduct && newProduct.id !== id) {
      navigate(`/${product?.category}/${newProduct.id}`);
    }
  }, [
    selectedColor,
    selectedCapacity,
    allProducts,
    id,
    navigate,
    product?.namespaceId,
    product?.category,
  ]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return <div>Продукт не знайдено</div>;
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapacityChange = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  const newModels = products.filter(item => item.year === 2022);

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
        <span className={styles.product__icons_name}>{product.name}</span>
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
      <div className={styles.product__group}>
        <div className={styles.product__gallery}>
          <div className={styles.product__gallery_main}>
            <img
              className={styles.product__gallery_main_img}
              src={`public/${selectedImage}`}
              alt="Selected product"
            />
          </div>
          <div className={styles.product__gallery_thumbnails}>
            {product.images.map(image => (
              <img
                key={image}
                src={`public/${image}`}
                alt="Thumbnail"
                className={classNames(styles.product__gallery_thumbnail, {
                  [styles.active]: selectedImage === image,
                })}
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
                  className={classNames(
                    styles.product__controls_colors_button,
                    {
                      [styles.active]: selectedColor === color,
                    },
                  )}
                  style={{ backgroundColor: colorMap[color] }}
                  onClick={() => handleColorChange(color)}
                  disabled={color === selectedColor}
                ></button>
              ))}
            </div>
          </div>
          <div className={styles.product__controls_line}></div>
          <div className={styles.product__controls_capacity}>
            <p className={styles.product__controls_capacity_title}>
              Select capacity
            </p>
            <div className={styles.product__controls_capacity_buttons}>
              {product.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  type="button"
                  className={classNames(
                    styles.product__controls_capacity_button,
                    {
                      [styles.active]: selectedCapacity === capacity,
                    },
                  )}
                  onClick={() => handleCapacityChange(capacity)}
                  disabled={capacity === selectedCapacity}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.product__controls_line}></div>

          <div className={styles.product__controls_group}>
            <div className={styles.product__controls_group_prices}>
              <h3 className={styles.product__controls_group_prices_discount}>
                ${product.priceDiscount}
              </h3>
              <p className={styles.product__controls_group_prices_regular}>
                ${product.priceRegular}
              </p>
            </div>
            <div className={styles.product__controls_group_buttons}>
              {realProduct && (
                <ToggleButton
                  product={realProduct}
                  type="cart"
                  isActive={isInCart}
                />
              )}
              {realProduct && (
                <ToggleButton
                  product={realProduct}
                  type="favorites"
                  isActive={isInFavorites}
                />
              )}
            </div>
          </div>
          <div className={styles.product__controls_specifications}>
            <div className={styles.product__controls_specification}>
              <p className={styles.product__controls_specificationName}>
                Screen
              </p>
              <p className={styles.product__controls_specificationValue}>
                {product.screen}
              </p>
            </div>
            <div className={styles.product__controls_specification}>
              <p className={styles.product__controls_specificationName}>
                Resolution
              </p>
              <p className={styles.product__controls_specificationValue}>
                {product.resolution}
              </p>
            </div>
            <div className={styles.product__controls_specification}>
              <p className={styles.product__controls_specificationName}>
                Proccessor
              </p>
              <p className={styles.product__controls_specificationValue}>
                {product.processor}
              </p>
            </div>
            <div className={styles.product__controls_specification}>
              <p className={styles.product__controls_specificationName}>RAM</p>
              <p className={styles.product__controls_specificationValue}>
                {product.ram}
              </p>
            </div>
          </div>
        </div>
      </div>
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
          {'camera' in product && product.camera && (
            <p className={styles.product__techSpecs_name}>
              Camera
              <span className={styles.product__techSpecs_value}>
                {product.camera}
              </span>
            </p>
          )}
          {'camera' in product && product.zoom && (
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

      <ProductSwiper name="You may also like" products={newModels} />
    </div>
  );
};

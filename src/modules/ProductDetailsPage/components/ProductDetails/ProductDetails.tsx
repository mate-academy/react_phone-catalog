import classNames from 'classnames';

import { CategoryProduct } from '../../../../types/CategoryProduct';
import { Product } from '../../../../types/Product';
import { Button } from '../../../../components/Button';
import { FavouritesButton } from '../../../../components/FavouritesButton';
import { PriceBlock } from '../../../../components/PriceBlock';
import styles from './ProductDetails.module.scss';
import { PRODUCT_COLORS } from '../../../../constants/productColors';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductsSlider } from '../../../../components/ProductsSlider';
import {
  getCharacteristics,
  getTechSpecs,
} from '../../../../utils/productSpecs';
import { useShoppingCart } from '../../../../store/CartContext';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { BackBtn } from '../../../../components/BackBtn';

type Props = {
  productDetails: CategoryProduct;
  product: Product;
  suggestedProducts: Product[];
};

export const ProductDetails: React.FC<Props> = ({
  productDetails,
  product,
  suggestedProducts,
}) => {
  const {
    id,
    name,
    namespaceId,
    images,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    description,
  } = productDetails;

  const [selectedImg, setSelectedImg] = useState('');

  useEffect(() => {
    setSelectedImg(images[0]);
  }, [images]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetails]);

  const { addToCart, shoppingCartProducts, deleteFromCart } = useShoppingCart();

  const addedToCart = shoppingCartProducts.find(item => item.id === product.id);

  const handleCartProducts = () => {
    return addedToCart ? deleteFromCart(product.itemId) : addToCart(product);
  };

  const characteristics = getCharacteristics(productDetails);

  const techSpecs = getTechSpecs(productDetails);

  const getColorLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.product__colorBtn, {
      [styles.product__colorActive]: isActive,
    });

  const getCapacityLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.product__capacity, {
      [styles.product__capacityActive]: isActive,
    });

  const currentColor = color.replace(/\s/, '-');
  const currentCapacity = capacity.toLowerCase();

  return (
    <div className={styles.product}>
      <Breadcrumbs name={name} />
      <BackBtn />
      <h2>{name}</h2>
      <section className={styles.product__details}>
        <div className={styles.product__images}>
          <div className={styles.product__imagesWrapper}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={namespaceId}
                className={classNames(styles.product__image, {
                  [styles.product__image__active]: img === selectedImg,
                })}
                onClick={() => setSelectedImg(img)}
              />
            ))}
          </div>

          <div className={styles.product__imageSelected}>
            <img src={selectedImg} alt={namespaceId} />
          </div>
        </div>
        <div className={styles.product__info}>
          <div className={styles.product__infoWrapper}>
            <div>
              <p
                className={classNames(styles.product__text, 'text-small-thin')}
              >
                Available colors
              </p>
              <div className={styles.product__optionsAvailable}>
                {colorsAvailable.map(productColor => (
                  <NavLink
                    key={productColor}
                    to={`../${id.replace(currentColor, productColor.replace(/\s/, '-'))}`}
                    replace
                    className={getColorLinkClass}
                  >
                    <div
                      style={{
                        backgroundColor:
                          PRODUCT_COLORS[
                            productColor as keyof typeof PRODUCT_COLORS
                          ],
                      }}
                      className={styles.product__color}
                    ></div>
                  </NavLink>
                ))}
              </div>
            </div>
            <div className={styles.product__divider}></div>
            <div className={styles.product__capacityWrapper}>
              <p
                className={classNames(styles.product__text, 'text-small-thin')}
              >
                Select capacity
              </p>
              <div className={styles.product__optionsAvailable}>
                {capacityAvailable.map(productCapacity => (
                  <NavLink
                    key={productCapacity}
                    to={`../${id.replace(currentCapacity, productCapacity.toLowerCase())}`}
                    replace
                    className={getCapacityLinkClass}
                  >
                    {productCapacity}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className={styles.product__divider}></div>

            <div className={styles.product__prices}>
              <PriceBlock price={priceRegular} priceDiscount={priceDiscount} />
            </div>

            <div className={styles.product__btns}>
              <div onClick={handleCartProducts}>
                <Button text={'Add to cart'} addedToCart={addedToCart} />
              </div>
              <FavouritesButton product={product} />
            </div>

            <div className={styles.product__characteristics}>
              {characteristics.map(char => (
                <div
                  className={styles.product__characteristic}
                  key={char.value}
                >
                  <p className={styles.product__characteristic__name}>
                    {char.title}
                  </p>
                  <p className={styles.product__characteristic__value}>
                    {char.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {product && (
            <p className={classNames(styles.product__idNum, 'text-small')}>
              ID: {product.id}
            </p>
          )}
        </div>
      </section>

      <section className={styles.product__description}>
        <div className={styles.product__about}>
          <h3>About</h3>
          <div className={styles.product__divider}></div>
          {description.map((desc, index) => (
            <div className={styles.product__aboutWrapper} key={index}>
              <h4>{desc.title}</h4>
              <p className={classNames(styles.product__aboutDesc, 'text-body')}>
                {desc.text}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.product__tech}>
          <h3>Tech specs</h3>
          <div className={styles.product__divider}></div>
          <div className={styles.product__techSpecs}>
            {techSpecs.map(spec => (
              <div key={spec.title}>
                {spec.value && (
                  <div className={styles.product__spec}>
                    <p
                      className={classNames(
                        styles.product__specName,
                        'text-body',
                      )}
                    >
                      {spec.title}
                    </p>
                    <p
                      className={classNames(
                        styles.product__specValue,
                        'text-body',
                      )}
                    >
                      {spec.value}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.product__recommendations}>
        <ProductsSlider
          products={suggestedProducts}
          type={'recommendations'}
          title={'You may also like'}
        />
      </section>
    </div>
  );
};

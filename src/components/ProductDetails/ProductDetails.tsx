import { useEffect, useState } from 'react';
import styles from './ProductDetails.module.scss';
import { Gadget } from '../../types/Gadgets';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { Product } from '../../types/Product';
import { getBgColorForRadio, techSpecs } from '../../utils';
import { useSnackbar } from 'notistack';
import { createHandleClickVariant } from '../../utils/snackbarHelpers';

const BASE_URL = import.meta.env.BASE_URL || '/';

type Props = {
  product: Gadget;
};

type ProductSpecKey = keyof Gadget;

const ProductDetails: React.FC<Props> = ({ product }) => {
  const [currMainImg, setCurrMainImg] = useState(0);
  const [formattedProduct, setFormattedProduct] = useState<Product>();
  const { favourites, toggleProduct } = useFavourites();
  const { cart, addProductToCart } = useCart();
  const { getProductById } = useProducts();
  const { pathname } = useLocation();

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = createHandleClickVariant(enqueueSnackbar);

  const isAddedToFavourites = favourites.some(
    p => p.id === (formattedProduct ? +formattedProduct.id : 0),
  );
  const isAddedToCart = cart.some(
    p => p.id === (formattedProduct ? +formattedProduct.id : 0),
  );

  const handleToggleFavourite = () => {
    if (formattedProduct) {
      toggleProduct(formattedProduct);
      if (isAddedToFavourites) {
        handleClickVariant(`Product was removed from wishlist`, 'warning')();
      } else {
        handleClickVariant(`Product was added to wishlist`, 'success')();
      }
    }
  };

  const handleAddProductToCart = () => {
    if (formattedProduct) {
      addProductToCart(formattedProduct);
      handleClickVariant('Product was added to cart', 'success')();
    }
  };

  useEffect(() => {
    getProductById(product.id).then(res => setFormattedProduct(res));
  }, [product, getProductById]);

  const randomInt = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

  return (
    <div className={styles.product_details}>
      <div className={styles.product_details__top}>
        <p className={styles.product_details__name}>{product.name}</p>
        <div className={styles.product_details__content}>
          <div className={styles.product_details__album}>
            <div className={styles.product_details__images}>
              {product.images.map((image, i) => (
                <div
                  className={`${styles.product_details__image} ${currMainImg === i && styles.product_details__image_active}`}
                  onClick={() => setCurrMainImg(i)}
                  key={i}
                >
                  <img src={`${BASE_URL}/${image}`} alt="image" />
                </div>
              ))}
            </div>
            <div className={styles.product_details__image_big}>
              <img
                src={`${BASE_URL}/${product.images[currMainImg]}`}
                alt="image"
              />
            </div>
          </div>

          <div className={styles.product_details__characteristics}>
            <div className={styles.colors}>
              <div className={styles.colors__top}>
                <p className={styles.colors__name}>Available Colors</p>
                <p className={styles.colors__id}>{`ID: ${randomInt}`}</p>
              </div>

              <div className={styles.colors__bottom}>
                {product.colorsAvailable.map(color => {
                  const formattedCurrentColor = product.color
                    .split(' ')
                    .join('-');
                  const formattedNewColor = color.split(' ').join('-');

                  const newPath = pathname.replace(
                    new RegExp(`-${formattedCurrentColor}$`),
                    `-${formattedNewColor}`,
                  );

                  const bgColor = getBgColorForRadio(formattedNewColor);

                  return (
                    <Link key={color} to={newPath}>
                      <div
                        className={`${styles.colors__color} ${product.color === color ? styles.colors__color_active : ''}`}
                        style={{ backgroundColor: bgColor }}
                      ></div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={styles.product_details__capacities}>
              <p className={styles.product_details__capacities_title}>
                Select capacity
              </p>

              <div className={styles.product_details__capacities_wrapper}>
                {product.capacityAvailable.map(capacity => {
                  const activeCapacity = pathname.includes(
                    capacity.toLowerCase(),
                  );

                  const newPath = pathname.replace(
                    /\d+(gb|mm|tb)/g,
                    capacity.toLowerCase(),
                  );

                  return (
                    <Link to={newPath} key={capacity}>
                      <button
                        className={`${styles.product_details__capacity} ${activeCapacity && styles.product_details__capacity_active}`}
                      >
                        {capacity}
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={styles.product_details__prices}>
              <div className={styles.product_details__price}>
                ${product.priceDiscount}
              </div>
              <div className={styles.product_details__fullPrice}>
                ${product.priceRegular}
              </div>
            </div>

            <div className={styles.product_details__buttons}>
              <button
                className={`${styles.product_details__cart} ${isAddedToCart && styles.product_details__cart_active}`}
                onClick={handleAddProductToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                className={styles.product_details__favourites}
                onClick={handleToggleFavourite}
              >
                <img
                  src={`${BASE_URL}/img/icons/favourites-icon${isAddedToFavourites ? '-active' : ''}.svg`}
                  alt="favourites"
                />
              </button>
            </div>

            <div className={styles.product_details__features}>
              {techSpecs.slice(0, 4).map(spec => {
                const value = product[spec as ProductSpecKey];
                const upperCaseSpec =
                  spec.charAt(0).toUpperCase() + spec.slice(1);

                return (
                  value && (
                    <div key={spec} className={styles.product_details__feature}>
                      <p className={styles.product_details__param}>
                        {upperCaseSpec}
                      </p>
                      <p className={styles.product_details__value}>
                        {Array.isArray(value) ? value.join(', ') : value}
                      </p>
                    </div>
                  )
                );
              })}
            </div>

            <div></div>
          </div>
        </div>
      </div>
      <div className={styles.product_details__bottom}>
        <div className={styles.product_details__left}>
          <h3 className={styles.product_details__title}>About</h3>
          <div className={styles.product_details__descriptions}>
            {product.description.map((desc, idx) => (
              <div className={styles.product_details__description} key={idx}>
                <h4 className={styles.product_details__description_title}>
                  {desc.title}
                </h4>
                <div className={styles.product_details__description_text}>
                  {desc.text[0]}
                </div>
                <br />
                <div className={styles.product_details__description_text}>
                  {desc.text[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.product_details__right}>
          <h3 className={styles.product_details__title}>Tech specs</h3>
          <div className={styles.product_details__features}>
            {techSpecs.map(spec => {
              const value = product[spec as ProductSpecKey];
              const upperCaseSpec =
                spec.charAt(0).toUpperCase() + spec.slice(1);

              return (
                value && (
                  <div
                    key={spec}
                    className={`${styles.product_details__feature} ${styles.product_details__feature_big}`}
                  >
                    <p className={styles.product_details__param}>
                      {upperCaseSpec}
                    </p>
                    <p className={styles.product_details__value}>
                      {Array.isArray(value) ? value.join(', ') : value}
                    </p>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

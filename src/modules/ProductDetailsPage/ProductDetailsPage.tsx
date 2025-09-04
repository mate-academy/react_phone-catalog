/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../services/products';
import classNames from 'classnames';
import { useCartDispatch, useCartState } from '../../contexts/CartContext';
import { Product } from '../../types/Product';
import { Loader } from '../../shared/Loader/Loader';
import { TechSpecs } from '../../components/TechSpecs/TechSpecs';
import { AboutProduct } from '../../components/AboutProduct/AboutProduct';
// eslint-disable-next-line max-len
import { ProductImgsGallery } from '../../components/ProductImgsGallery/ProductImgsGallery';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ProductsContext } from '../../contexts/ProductsContext';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const navigate = useNavigate();
  const { category, productId } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [allProductsDetails, setAllProductsDetails] = useState<
  ProductDetails[]
  >([]);
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useCartDispatch();
  const { cart, favorites } = useCartState();
  const productsFromServer = useContext(ProductsContext);

  useEffect(() => {
    if (!category) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      getProductDetails(category)
        .then(products => {
          setAllProductsDetails(products);

          if (productId) {
            const found = products.find(p => p.id === productId);

            if (found) {
              setSelectedImg(found.images[0]);
              setProductDetails(found);
              setSelectedColor(found.color);
              setSelectedCapacity(found.capacity);
            }
          }
        })
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setLoading(false));
    }, 500);
  }, [category, productId]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);

    if (productDetails) {
      const varient = allProductsDetails.find(
        p =>
          p.namespaceId === productDetails.namespaceId &&
          p.color === event.target.value &&
          p.capacity === selectedCapacity,
      );

      if (varient) {
        navigate(`/${category}/${varient.id}`, { replace: true });
      }
    }
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCapacity(event.target.value);

    if (productDetails) {
      const varient = allProductsDetails.find(
        p =>
          p.namespaceId === productDetails.namespaceId &&
          p.capacity === event.target.value &&
          p.color === selectedColor,
      );

      if (varient) {
        navigate(`/${category}/${varient.id}`, { replace: true });
      }
    }
  };

  const getNewProdut = (
    currentProduct: ProductDetails | null,
    actionType: 'ADD_TO_CART' | 'TOGGLE_FAV',
  ) => {
    if (currentProduct) {
      const newProduct: Product = {
        id: currentProduct.id,
        itemId: currentProduct.namespaceId,
        name: currentProduct.name,
        category: currentProduct.category,
        screen: currentProduct.screen,
        capacity: currentProduct.capacity,
        color: currentProduct.color,
        ram: currentProduct.ram,
        year: 0,
        image: currentProduct.images[0],
        fullPrice: currentProduct.priceRegular,
        price: currentProduct.priceDiscount,
      };

      dispatch({ type: actionType, payload: newProduct });
    }
  };

  const handleAddToCart = () => {
    getNewProdut(productDetails, 'ADD_TO_CART');
  };

  const handleAddToFav = () => {
    getNewProdut(productDetails, 'TOGGLE_FAV');
  };

  if (loading && !errorMessage) {
    return <Loader />;
  }

  if (!productDetails) {
    return (
      <div className={styles.productDetails__notFoundBlock}>
        <p className={styles.productDetails__notFound}>Product not found</p>
        <button
          className={styles.productDetails__back}
          onClick={() => navigate('..')}
          type="button"
        >
          Back
        </button>
      </div>
    );
  }

  const isInCart = cart.some(item => item.product.id === productDetails.id);
  const isLiked = favorites.some(fav => fav.id === productDetails.id);

  return (
    <section className={styles.productDetails}>
      <div className={styles.container}>
        {loading && <Loader />}
        {!loading && productDetails && (
          <div className={styles.productDetails__inner}>
            <Breadcrumbs pathnames={pathnames} />
            <h1 className={styles.productDetails__title}>
              {productDetails.name}
            </h1>
            <div className={styles.productDetails__wrapper}>
              <ProductImgsGallery
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
                product={productDetails}
              />

              <div className={styles.productDetails__info}>
                <div className={styles.productDetails__colorsBlock}>
                  <span className={styles.productDetails__colorsTitle}>
                    Available colors
                  </span>

                  <div className={styles.productDetails__inputWrapper}>
                    {productDetails.colorsAvailable.map(color => (
                      <input
                        onChange={handleColorChange}
                        key={color}
                        type="radio"
                        value={color}
                        checked={selectedColor === color}
                        className={styles.productDetails__radio}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.productDetails__capacityBlock}>
                  <span className={styles.productDetails__capacityTitle}>
                    Select capacity
                  </span>

                  <div className={styles.productDetails__capacityWrapper}>
                    {productDetails.capacityAvailable.map(capacity => (
                      <label
                        className={styles.productDetails__capacityLabel}
                        key={capacity}
                      >
                        <input
                          onChange={handleCapacityChange}
                          placeholder={capacity}
                          type="radio"
                          value={capacity}
                          className={styles.productDetails__capacity}
                          checked={capacity === selectedCapacity}
                        />
                        <span className={styles.productDetails__capacityStyle}>
                          {capacity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.productDetails__priceBlock}>
                  <div className={styles.productDetails__prices}>
                    <span className={styles.productDetails__newPrice}>
                      ${productDetails.priceDiscount}
                    </span>
                    <span className={styles.productDetails__oldPrice}>
                      ${productDetails.priceRegular}
                    </span>
                  </div>

                  <div className={styles.productDetails__btns}>
                    <button
                      onClick={handleAddToCart}
                      className={classNames(styles.productDetails__add, {
                        [styles.productDetails__addActive]: isInCart,
                      })}
                      type="button"
                      disabled={isInCart}
                    >
                      {isInCart ? 'Added' : 'Add to cart'}
                    </button>
                    <button
                      onClick={handleAddToFav}
                      className={classNames(styles.productDetails__like, {
                        [styles.productDetails__likeActive]: isLiked,
                      })}
                      type="button"
                    ></button>
                  </div>
                </div>

                <div className={styles.productDetails__specs}>
                  <ul className={styles.productDetails__specsList}>
                    <li className={styles.productDetails__specsListItem}>
                      <span className={styles.productDetails__specsName}>
                        Screen
                      </span>
                      <span className={styles.productDetails__specInfo}>
                        {productDetails.screen}
                      </span>
                    </li>
                    <li className={styles.productDetails__specsListItem}>
                      <span className={styles.productDetails__specsName}>
                        Resolution
                      </span>
                      <span className={styles.productDetails__specInfo}>
                        {productDetails.resolution}
                      </span>
                    </li>
                    <li className={styles.productDetails__specsListItem}>
                      <span className={styles.productDetails__specsName}>
                        Processor
                      </span>
                      <span className={styles.productDetails__specInfo}>
                        {productDetails.processor}
                      </span>
                    </li>
                    <li className={styles.productDetails__specsListItem}>
                      <span className={styles.productDetails__specsName}>
                        RAM
                      </span>
                      <span className={styles.productDetails__specInfo}>
                        {productDetails.ram}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.productDetails__infoAboutProduct}>
              <AboutProduct product={productDetails} />
              <TechSpecs product={productDetails} />
            </div>
          </div>
        )}

        <ProductsSlider
          title={'You may also like'}
          products={productsFromServer}
        />

        {errorMessage && (
          <p className={styles.productDetails__errorMessage}>{errorMessage}</p>
        )}
      </div>
    </section >
  );
};

/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import classNames from 'classnames';
import { AppDispatch, RootState } from '../../../app/store/store';
import { handleAddToCart } from '../../../services/addToCart';
import { handleAddToFavourites } from '../../../services/addToFavourites';
import { fetchPhones, resetStatus } from '../../../app/reducers/phones';
import { fetchTablets } from '../../../app/reducers/tablets';
import { fetchAccessories } from '../../../app/reducers/accessories';
import { setName } from '../../../app/reducers/productName';
import { Product } from '../../../types/Product';
import { Accessories } from '../../../types/Accessories';
import { Tablet } from '../../../types/Tablet';
import { Phone } from '../../../types/Phone';
import { ProductNotFound } from '../ProductNotFound/ProductNotFound';
import { ProductOverview } from '../ProductOverview';
import { ProductInfo } from '../ProductInfo';
import { MayYouLike } from '../MayYouLike';
import home from '../../../images/icons/home-2x.png';
import styles from './ProductDetails.module.scss';

type Props = {
  category: string;
};

export const ProductDetails: React.FC<Props> = ({ category }) => {
  const { itemId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const productName = useSelector((state: RootState) => state.productName.item);
  const cartProducts = useSelector((state: RootState) => state.cart.items);
  const favouritesProducts = useSelector(
    (state: RootState) => state.favourites.items,
  );
  const allGeneralProducts = useSelector(
    (state: RootState) => state.products.items,
  );

  const phones = useSelector((state: RootState) => state.phones.items);
  const tablets = useSelector((state: RootState) => state.tablets.items);
  const accessories = useSelector(
    (state: RootState) => state.accessories.items,
  );

  const statusPhones = useSelector((state: RootState) => state.phones.status);
  const statusTablets = useSelector((state: RootState) => state.tablets.status);
  const statusAccessories = useSelector(
    (state: RootState) => state.accessories.status,
  );

  const selectedProduct = useMemo(() => {
    switch (category) {
      case 'phones':
        return phones.find(p => p.id === itemId) || null;

      case 'tablets':
        return tablets.find(t => t.id === itemId) || null;

      case 'accessories':
        return accessories.find(a => a.id === itemId) || null;

      default:
        return null;
    }
  }, [category, itemId, phones, tablets, accessories]);

  const status = useMemo(() => {
    if (category === 'phones') {
      return statusPhones;
    }

    if (category === 'tablets') {
      return statusTablets;
    }

    if (category === 'accessories') {
      return statusAccessories;
    }

    return 'loading';
  }, [category, statusPhones, statusTablets, statusAccessories]);

  const cartProductsFormatted = useMemo(
    () =>
      cartProducts.map((product: Product) => ({
        ...product,
        id: String(product.id),
      })),
    [cartProducts],
  );

  const favouritesProductsFormatted = useMemo(
    () =>
      favouritesProducts.map(product => ({
        ...product,
        id: String(product.id),
      })),
    [favouritesProducts],
  );

  const productWithUpdatedPrice = useMemo(() => {
    if (!selectedProduct) {
      return null;
    }

    const generalInfo = allGeneralProducts.find(p => p.itemId === itemId);

    return {
      ...selectedProduct,
      priceDiscount: generalInfo?.price ?? selectedProduct.priceDiscount,
      priceRegular: generalInfo?.fullPrice ?? selectedProduct.priceRegular,
      id: String(selectedProduct.id),
    };
  }, [selectedProduct, allGeneralProducts, itemId]);

  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetStatus());

    if (category === 'phones') {
      dispatch(fetchPhones());
    }

    if (category === 'tablets') {
      dispatch(fetchTablets());
    }

    if (category === 'accessories') {
      dispatch(fetchAccessories());
    }
  }, [dispatch, category, itemId]);

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.images[0]);
      dispatch(setName(selectedProduct.name));
    }
  }, [selectedProduct, dispatch]);

  useEffect(() => {
    if (!productWithUpdatedPrice && status !== 'loading') {
      const timer = setTimeout(() => setShowNotFound(true), 3000);

      return () => clearTimeout(timer);
    }

    setShowNotFound(false);
  }, [productWithUpdatedPrice, status]);

  const handleImageClick = useCallback((image: string | undefined) => {
    setMainImage(image);
  }, []);

  const handleFavouritesClick = useCallback(() => {
    if (productWithUpdatedPrice) {
      handleAddToFavourites(
        productWithUpdatedPrice.id,
        productWithUpdatedPrice.id,
        productWithUpdatedPrice.images[0],
        productWithUpdatedPrice.name,
        productWithUpdatedPrice.priceDiscount,
        productWithUpdatedPrice.priceRegular,
        productWithUpdatedPrice.screen,
        productWithUpdatedPrice.capacity,
        productWithUpdatedPrice.ram,
        productWithUpdatedPrice.category,
        favouritesProducts,
        dispatch,
      );
    }
  }, [productWithUpdatedPrice, favouritesProducts, dispatch]);

  const handleCartClick = useCallback(() => {
    if (productWithUpdatedPrice) {
      handleAddToCart(
        productWithUpdatedPrice.id,
        productWithUpdatedPrice.id,
        productWithUpdatedPrice.images[0],
        productWithUpdatedPrice.name,
        productWithUpdatedPrice.priceDiscount,
        productWithUpdatedPrice.category,
        1,
        cartProducts,
        dispatch,
      );
    }
  }, [productWithUpdatedPrice, cartProducts, dispatch]);

  const handleCapacityClick = (capacity: string) => {
    const select = productWithUpdatedPrice?.id;
    const memory = capacity.toLocaleLowerCase();
    const selectString = typeof select === 'number' ? select : select;

    if (!selectString) {
      return;
    }

    const selectParts = selectString?.split('-');

    if (productWithUpdatedPrice?.category === 'phones') {
      selectParts[selectParts.length - 2] = memory;
    }

    if (productWithUpdatedPrice?.category === 'tablets') {
      selectParts[5] = memory;
    }

    if (
      productWithUpdatedPrice?.category === 'accessories' &&
      selectParts?.length === 7
    ) {
      selectParts[4] = memory;
    }

    if (
      productWithUpdatedPrice?.category === 'accessories' &&
      selectParts?.length === 6
    ) {
      selectParts[4] = memory;
    }

    if (
      productWithUpdatedPrice?.category === 'accessories' &&
      selectParts?.length === 5
    ) {
      selectParts[3] = memory;
    }

    const newSelect = selectParts?.join('-');

    navigate(`/${productWithUpdatedPrice?.category}/${newSelect}`);
  };

  const handleColorClick = (color: string) => {
    const select = productWithUpdatedPrice?.id;
    const color1 = color.toLowerCase();
    const selectColors = typeof select === 'number' ? select : select;

    if (!selectColors) {
      return;
    }

    const selectParts = selectColors.split('-');

    selectParts[selectParts.length - 1] = color1;

    if (
      productWithUpdatedPrice?.category === 'accessories' &&
      selectParts.length === 7
    ) {
      selectParts.pop();
      selectParts.push(color1);
    }

    const newColor = selectParts.join('-');

    navigate(`/${productWithUpdatedPrice?.category}/${newColor}`);
  };

  const goBack = () =>
    window.history.length > 1 ? navigate(-1) : navigate(`/${category}`);

  return (
    <>
      {!productWithUpdatedPrice && showNotFound ? (
        <ProductNotFound />
      ) : (
        <section className={'container'}>
          <div className={styles.productDetails}>
            <div className={styles.productDetails_navContainer}>
              <img
                src={home}
                alt="Home"
                className={styles.productDetails_navContainer_img}
                onClick={() => navigate('/')}
              />
              <Link
                to={`/${category}`}
                className={styles.productDetails_navContainer_category}
              >
                {category}
              </Link>
              <p className={styles.productDetails_navContainer_name}>
                {productName}
              </p>
            </div>

            <div className={styles.productDetails_backContainer}>
              <span onClick={goBack} className={styles.productDetails_backText}>
                Back
              </span>
            </div>

            {status === 'loading' ? (
              <div className={styles.loader}>
                <BounceLoader size={150} color="#313237" />
              </div>
            ) : (
              <div className={classNames(styles.product)}>
                <ProductOverview
                  selectedProduct={productWithUpdatedPrice}
                  mainImage={mainImage ?? ''}
                  cartProducts={cartProductsFormatted}
                  favouritesProducts={favouritesProductsFormatted}
                  handleImageClick={handleImageClick}
                  handleColorClick={handleColorClick}
                  handleCapacityClick={handleCapacityClick}
                  handleCartClick={handleCartClick}
                  handleFavouritesClick={handleFavouritesClick}
                />
                <ProductInfo
                  selectedProduct={
                    productWithUpdatedPrice as Phone | Tablet | Accessories
                  }
                />
                <MayYouLike />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

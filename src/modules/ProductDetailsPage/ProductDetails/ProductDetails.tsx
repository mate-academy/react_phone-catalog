/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import classNames from 'classnames';
import { AppDispatch, RootState } from '../../../app/store';
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
import { MayLike } from '../MayLike';
import home from '../../../assets/img/icons/home-icon.png';
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

  const cartProductsFormatted = cartProducts.map((product: Product) => ({
    ...product,
    id: String(product.id),
  }));

  let selectedProduct: Phone | null = useSelector(
    (state: RootState) =>
      state.phones.items.find(phone => phone.id === itemId) ?? null,
  );

  const selectedTablet = useSelector((state: RootState) =>
    state.tablets.items.find(tablet => tablet.id === itemId),
  );

  const selectedAccess = useSelector((state: RootState) =>
    state.accessories.items.find(acces => acces.id === itemId),
  );

  if (selectedTablet) {
    selectedProduct = selectedTablet;
  }

  if (selectedAccess) {
    selectedProduct = selectedAccess;
  }

  let status;
  const statusPhones = useSelector((state: RootState) => state.phones.status);
  const statusTablets = useSelector((state: RootState) => state.tablets.status);
  const statusAccessories = useSelector(
    (state: RootState) => state.accessories.status,
  );

  if (selectedProduct?.category === 'phones') {
    status = statusPhones;
  } else if (selectedProduct?.category === 'tablets') {
    status = statusTablets;
  } else if (selectedProduct?.category === 'accessories') {
    status = statusAccessories;
  } else {
    status = 'loading';
  }

  const favouritesProducts = useSelector(
    (state: RootState) => state.favourites.items,
  );

  const favouritesProductsFormatted = favouritesProducts.map(product => ({
    ...product,
    id: String(product.id),
  }));

  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetStatus());
    if (selectedProduct?.category === 'phones') {
      dispatch(fetchPhones());
    }

    if (selectedProduct?.category === 'tablets') {
      dispatch(fetchTablets());
    }

    if (selectedProduct?.category === 'accessories') {
      dispatch(fetchAccessories());
    }
  }, [dispatch, selectedProduct?.category]);

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  const products = useSelector((state: RootState) => state.products.items);
  const productFromAll = products.find(product => product.itemId === itemId);

  const productWithUpdatedPrice = useMemo(() => {
    if (!selectedProduct) {
      return null;
    }

    return {
      ...selectedProduct,
      priceDiscount: productFromAll?.price ?? selectedProduct.priceDiscount,
      priceRegular: productFromAll?.fullPrice ?? selectedProduct.priceRegular,
      id: String(selectedProduct.id),
    };
  }, [selectedProduct, productFromAll]);

  const handleImageClick = (image: string | undefined) => {
    setMainImage(image);
  };

  const handleFavouritesClick = () => {
    if (productWithUpdatedPrice) {
      handleAddToFavourites(
        productWithUpdatedPrice.id,
        String(productWithUpdatedPrice.id),
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
  };

  const handleCartClick = () => {
    if (productWithUpdatedPrice) {
      handleAddToCart(
        productWithUpdatedPrice.id,
        String(productWithUpdatedPrice.id),
        productWithUpdatedPrice.images[0],
        productWithUpdatedPrice.name,
        productWithUpdatedPrice.priceDiscount,
        productWithUpdatedPrice.category,
        1,
        cartProducts,
        dispatch,
      );
    }
  };

  if (productWithUpdatedPrice) {
    dispatch(setName(productWithUpdatedPrice.name));
  }

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

  const back = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/${category}`);
    }
  };

  const goHome = () => {
    navigate('..');
  };

  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (!productWithUpdatedPrice) {
      timer = setTimeout(() => {
        setShowNotFound(true);
      }, 5000);
    } else {
      setShowNotFound(false);
      if (timer) {
        clearTimeout(timer);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [productWithUpdatedPrice]);

  return (
    <React.Fragment>
      {!productWithUpdatedPrice && showNotFound ? (
        <ProductNotFound />
      ) : (
        <section className={'container'}>
          <div className={styles.productDetails}>
            <div className={styles.productDetails_navContainer}>
              <img
                src={home}
                alt="home"
                className={styles.productDetails_navContainer_img}
                onClick={goHome}
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
              <span onClick={back} className={styles.productDetails_backText}>
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
                <MayLike />
              </div>
            )}
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

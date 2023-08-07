/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs';
import '../styles/styles.scss';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Product } from '../types/Product';
import { Loader } from './components/Loader';
import { incrementAsyncOld, incrementAsync as loadPhoneDetails } from '../features/PhoneDetails/phoneDetailsSlice';
import { AsyncStatus } from '../types/AsyncStatus';
import { ProductsSlider } from './components/ProductsSlider';
import {
  favoriteProductsSelector,
  phoneCardSelector,
  phonesDetaildStatusSelector,
  phonesDetailsSelector,
  phonesSelector,
  phonesStatusSelector,
  productsSelector,
  selectedPhoneSelector,
} from '../app/selector';
import { setInCardPhone, unsetFromCardPhone } from '../features/PhonesInCard/phonesInCardSlice';
import { incrementAsync as loadPhones } from '../features/phones/phonesSlice';
import { KeyJson } from '../types/KeyJson';
import { setFavoritePhone, unsetFavoritePhone } from '../features/PhonesFavorites/phonesFavoritesSlice';
import { DesriptionNewApi } from './components/DesriptionApi';
import { incrementAsync as loadProducts } from '../features/products/productsSlice';

export const ProductDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectedPhoneSelector);
  const phonesFromServer = useAppSelector(phonesSelector);
  const productFromServer = useAppSelector(productsSelector);
  const statusPhones = useAppSelector(phonesStatusSelector);
  const phoneDetails = useAppSelector(phonesDetailsSelector);
  const phoneDetailsStatus = useAppSelector(phonesDetaildStatusSelector);
  const cardedPhones = useAppSelector(phoneCardSelector);
  const favoritesPhones = useAppSelector(favoriteProductsSelector);
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);

  const handleCardedProducts = () => {
    if (phoneDetails && phonesFromServer) {
      const currentPhone = phonesFromServer.find(p => p.itemId === phoneDetails.id);
      const oldApiProduct = productFromServer.find(p => p.id === phoneDetails.id);

      if (currentPhone) {
        if (cardedPhones.some(card => card.id === currentPhone.itemId)) {
          dispatch(unsetFromCardPhone(currentPhone));
        } else {
          dispatch(setInCardPhone(currentPhone));
        }
      }

      if (oldApiProduct) {
        if (cardedPhones.some(card => card.id === oldApiProduct.id)) {
          dispatch(unsetFromCardPhone(oldApiProduct));
        } else {
          dispatch(setInCardPhone(oldApiProduct));
        }
      }
    }
  };

  const handleFavoritesProducts = () => {
    if (phoneDetails && phonesFromServer) {
      const currentPhone = phonesFromServer.find(p => p.itemId === phoneDetails.id);
      const oldApiProduct = productFromServer.find(p => p.id === phoneDetails.id);

      if (currentPhone) {
        if (favoritesPhones.find(p => p.id === currentPhone.id)) {
          dispatch(unsetFavoritePhone(currentPhone));
        } else {
          dispatch(setFavoritePhone(currentPhone));
        }
      }

      if (oldApiProduct) {
        if (favoritesPhones.some(card => card.id === oldApiProduct.id)) {
          dispatch(unsetFavoritePhone(oldApiProduct));
        } else {
          dispatch(setFavoritePhone(oldApiProduct));
        }
      }
    }
  };

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadPhones());
    if (selectedProduct) {
      if (selectedProduct.itemId) {
        dispatch(loadPhoneDetails(selectedProduct.itemId));
      } else {
        dispatch(incrementAsyncOld(selectedProduct));
      }
    }
  }, []);

  useEffect(() => {
    if (phoneDetails && phoneDetailsStatus === AsyncStatus.IDLE) {
      if (phoneDetails.capacity) {
        window.localStorage.setItem(KeyJson.DETAILS, JSON.stringify(phoneDetails));
      } else if (selectedProduct) {
        window.localStorage.setItem(KeyJson.DETAILS, JSON.stringify({
          ...phoneDetails,
          priceDiscount: selectedProduct.price - selectedProduct.discount,
          priceRegular: selectedProduct.price,
        }));
      }
    }
  }, [phoneDetails]);
  useEffect(() => {
    if (statusPhones === AsyncStatus.IDLE) {
      const sortByYear = [...phonesFromServer].sort(
        (a: Product, b: Product) => b.year - a.year,
      );

      setBrandNewModels(sortByYear);
    }
  }, [phonesFromServer]);

  const isLoading = phoneDetailsStatus === AsyncStatus.LOADING
    || statusPhones === AsyncStatus.LOADING || !phoneDetails || !phonesFromServer;

  const [bigImgIndex, setBigImgIndex] = useState(0);
  const [capacityIndex, setCapacityIndex] = useState(0);

  const handleGalleryImg = (index: number) => {
    setBigImgIndex(index);
  };

  const handleCapacityItem = (index: number) => {
    setCapacityIndex(index);
  };

  return (
    <div className="product-details-page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs />
          <Link className="product-details-page__link-move-back link-move-back" to="..">
            <img className="link-move-back__arrow" src="images/icons/ArrowLeft-dark.svg" alt="Back button" />
            Back
          </Link>
          <h1 className="product-details-page__title">
            {phoneDetails.name}
          </h1>
          <DesriptionNewApi
            bigImgIndex={bigImgIndex}
            phoneDetails={phoneDetails}
            capacityIndex={capacityIndex}
            onGalleryImg={handleGalleryImg}
            onCapacityItem={handleCapacityItem}
            cardedPhones={cardedPhones}
            onCardedProducts={handleCardedProducts}
            favoritesPhones={favoritesPhones}
            onFavoritesProducts={handleFavoritesProducts}
          />
          <div className="product-details-page__you-may-like you-may-like">
            <h2 className="you-may-like__title">You may also like</h2>
            {statusPhones === AsyncStatus.IDLE && brandNewModels.length && (
              <ProductsSlider phones={brandNewModels} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

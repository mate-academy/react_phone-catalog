import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useEffect, useState } from 'react';
import {
  getProductsFromApi,
  getDetailedProductByCategory,
} from '../../utils/api';
import { Products } from '../../types/Products';

const colorsPrograms: Record<string, string> = {
  midnight: '#191970',
  yellow: '#E5E0C1',
  purple: '#e6ddeb',
  black: '#202020',
  green: '#ADE1CD',
  white: '#FFE681',
  red: '#BA0C2E',
  spaceblack: '#403E3D',
  gold: '#F4E8CE',
  graphite: '#6e6967',
  sierrablue: '#a7c1d9',
  pink: '#FADDD7',
  blue: '#A7C1D9',
  silver: '#C0C0C0',
  coral: '#FF7F50',
  rosegold: '#B76E79',
  midnightgreen: '#4E5851',
};

export const ProductDetailsPage = () => {
  const [detailedDevice, setDetailedDevice] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [clickedPhoto, setClickedPhoto] = useState(0);

  const navigate = useNavigate();

  const { category, productId } = useParams();

  const phoneWithoutColor = productId?.split('-').slice(0, -1).join('-');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    setDetailedDevice(null);

    getProductsFromApi()
      .then(async devicesFromApi => {
        const foundInCatalog = devicesFromApi.find(
          allDevices => allDevices.itemId === productId,
        );

        if (!foundInCatalog) {
          setErrorMessage('Product not found');

          return;
        }

        const detailed = await getDetailedProductByCategory(
          foundInCatalog.category,
          productId,
        );

        if (!detailed) {
          setErrorMessage('Product not found');

          return;
        }

        setDetailedDevice(detailed);
      })
      .catch(() => {
        setErrorMessage('Error, please try again');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.links}>
        <div className={styles.navigation}>
          <Link to="/">
            <img src="./img/home.svg" alt="homePhoto" />
          </Link>
          <img src="./img/arrowRight.svg" alt="arrowLeft" />
          <Link to="./../../" className={styles.title}>
            <p>{detailedDevice?.category}</p>
          </Link>
          <img src="./img/arrowRight.svg" alt="arrowLeft" />
          <p>{detailedDevice?.name}</p>
        </div>

        <div className={styles.back}>
          <Link to="./../../" className={styles.title}>
            <img src="./img/arrowLeft.svg" alt="arrowLeft" />
          </Link>
          <Link to="./../../" className={styles.title}>
            <p>Back</p>
          </Link>
        </div>
      </div>

      <h1>{detailedDevice?.name}</h1>

      <div className={styles.productTitle}>
        <div className={styles.ptohos}>
          <div className={styles.allPhotos}>
            {detailedDevice?.images.map(image => {
              return (
                <img
                  src={image}
                  alt={image}
                  key={image}
                  className={styles.images}
                  onClick={() =>
                    setClickedPhoto(detailedDevice.images.indexOf(image))
                  }
                />
              );
            })}
          </div>
        </div>

        <div className={styles.currentphoto}>
          <img
            src={detailedDevice?.images[clickedPhoto]}
            alt="currentPhoto"
            className={styles.currentPhoto}
          />
        </div>

        <div className={styles.productSettings}>
          <p>Available colors</p>
          <div className={styles.productColors}>
            {detailedDevice?.colorsAvailable.map(color => {
              return (
                <div
                  className={styles.colorBlock}
                  key={color}
                  style={{ backgroundColor: colorsPrograms[color] }}
                  onClick={() => {
                    navigate(
                      `/${category}/product/${phoneWithoutColor}-${color}`,
                    );
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

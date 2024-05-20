import { useContext, useEffect, useState } from 'react';
import { PathBar } from '../../shared/components/PathBar/PathBar';
import styles from './ProductInfoPage.module.scss';
import { DataTypes, getData } from '../../utils/ApiClient';
import { ProductInfo } from '../../types/ProductInfo';
import { Loader } from '../../shared/components/Loader/Loader';
import arrowBack from './icons/arrowBack.svg';
import whiteArrow from './icons/whiteLeft.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { ImagesBlock } from './components/ImagesBlock/ImagesBlock';
import { ShortInfo } from './components/ShortInfo/ShortInfo';
import { DetailedInfo } from './components/DetailedInfo/DetailedInfo';
// eslint-disable-next-line max-len
import { SuggestedProducts } from './components/SuggestedProducts/SuggestedProducts';
import { AppContext } from '../../utils/AppContext';
import classNames from 'classnames';

export const ProductInfoPage = () => {
  const [isLoading, setIsloading] = useState(true);
  const { isDarkTheme } = useContext(AppContext);
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [phoneFounded, setPhoneFounded] = useState(true);
  const [tabletFounded, setTabletFounded] = useState(true);
  const [accessoryFounded, setAccessoryFounded] = useState(true);

  const isNotFounded = !phoneFounded && !tabletFounded && !accessoryFounded;

  useEffect(() => {
    getData(DataTypes.phones).then(items => {
      const targetProduct = items.find(
        (item: ProductInfo) => item.id === productId,
      );

      if (targetProduct) {
        setProduct(targetProduct);
      } else {
        setPhoneFounded(false);
      }
    });

    getData(DataTypes.tablets).then(items => {
      const targetProduct = items.find(
        (item: ProductInfo) => item.id === productId,
      );

      if (targetProduct) {
        setProduct(targetProduct);
      } else {
        setTabletFounded(false);
      }
    });

    getData(DataTypes.accessories)
      .then(items => {
        const targetProduct = items.find(
          (item: ProductInfo) => item.id === productId,
        );

        if (targetProduct) {
          setProduct(targetProduct);
        } else {
          setAccessoryFounded(false);
        }
      })
      .finally(() => setTimeout(() => setIsloading(false), 600));

    if (isNotFounded) {
      navigate('/product-not-found');
    }
  }, [isNotFounded, navigate, productId]);

  if (product) {
    const { name, category, images } = product;
    const categoryName = category[0].toUpperCase() + category.slice(1);

    return (
      <main className={isDarkTheme ? styles.mainDark : ''}>
        {isLoading && <Loader />}

        {!isLoading && (
          <section className={styles.container}>
            <div className={styles.heading}>
              <PathBar category={categoryName} productName={name} />

              <div className={styles.goBack}>
                <div
                  className={classNames(
                    styles.goBack__arrow,
                    isDarkTheme ? styles.goBack__arrowDark : '',
                  )}
                  style={
                    isDarkTheme
                      ? { backgroundImage: `url(${whiteArrow})` }
                      : { backgroundImage: `url(${arrowBack})` }
                  }
                ></div>
                <span
                  className={classNames(
                    styles.goBack__link,
                    isDarkTheme ? styles.goBack__linkDark : '',
                  )}
                  onClick={() => window.history.go(-1)}
                >
                  Back
                </span>
              </div>

              <h2
                className={classNames(
                  styles.heading__title,
                  isDarkTheme ? styles.heading__titleDark : '',
                )}
              >
                {name}
              </h2>
            </div>

            <ImagesBlock images={images} />
            <ShortInfo product={product} />
            <DetailedInfo product={product} />
            <SuggestedProducts product={product} />
          </section>
        )}
      </main>
    );
  } else {
    return;
  }
};

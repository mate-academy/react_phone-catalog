import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Tree } from '../../components/Tree';
import { UseHooks } from '../../AppHooks';
import { getData } from '../../services';
import { DeviceFull } from '../../types/DeviceFull';
import styles from './DeviceDetails.module.scss';
import arrowLeft from '../../assets/Icons/Arrow-left.svg';
import { DetailsContextProvider, DetailsHooks } from './DetailsHook';
import { Loader } from '../../components/Loader';
import { Gallery } from '../../components/Gallery';
import { Params } from '../../components/Params';
import { Description } from '../../components/Description';
import { DeviceShort } from '../../types/DeviceShort';
import { CardScroller } from '../../components/CardScroller';

const DeviceDetails1 = () => {
  const { currentDevice, setCurrentDevice, allProducts, setAllProducts } =
    UseHooks();
  const { error, setError, loading, setLoading } = DetailsHooks();
  const { pathname } = useLocation();
  const { productId } = useParams();
  const navigate = useNavigate();

  const category = pathname.split('/')[1];

  const goBack = () => {
    navigate(-1);
  };

  const recommendedProducts = () => {
    const deltaPrice = 300;

    if (!currentDevice) {
      return [];
    }

    return allProducts.filter(
      product =>
        Math.abs(product.fullPrice - currentDevice.priceRegular) <= deltaPrice,
    );
  };

  useEffect(() => {
    getData<DeviceShort[]>('products')
      .then(data => setAllProducts(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    getData<DeviceFull[]>(category)
      .then(data => {
        const currentProduct = data.find(
          prod => prod.id === productId!.slice(10),
        );

        if (currentProduct) {
          setCurrentDevice(currentProduct);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (currentDevice) {
      const newLink = currentDevice.id;

      navigate(`/${category}/productId=${newLink}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDevice]);

  return (
    <>
      <div className="inlineContainer">
        <Tree />
        {loading && <Loader />}
        {currentDevice && !loading && !error ? (
          <>
            <div
              className={classNames(styles.back, 'small-text')}
              onClick={goBack}
            >
              <img
                className={styles.back__arrow}
                src={arrowLeft}
                alt="arrowLeft"
              />
              <p className={styles.back__text}>Back</p>
            </div>

            <h2 className={styles.name}>{currentDevice.name}</h2>

            <div className="gridContainer">
              <Gallery />
              <Params />
            </div>
            <Description />
          </>
        ) : (
          <p>Something went wrong</p>
        )}
      </div>
      <CardScroller items={recommendedProducts()} name={'recommend'} />
    </>
  );
};

export const DeviceDetails = () => {
  return (
    <DetailsContextProvider>
      <DeviceDetails1 />
    </DetailsContextProvider>
  );
};

/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { UseHooks } from '../../AppHooks';
import { PhonesContextProvider, PhonesHooks } from './PhonesHooks';
import { Loader } from '../../components/Loader';
import { getData, sortItems } from '../../services';
import styles from './Devices.module.scss';
import { ProductListBig } from '../../components/ProductListBig';
import { Sorting } from '../../components/Sorting';
import { DeviceShort } from '../../types/DeviceShort';

import arrowLeft from '../../assets/Icons/Arrow-left.svg';
import arrowRight from '../../assets/Icons/Arrow-right.svg';
import { Tree } from '../../components/Tree';

const Devices1 = () => {
  const {
    devicesOnPage,
    setDevicesOnPage,
    items,
    page,
    setPage,
    currentDevice,
  } = UseHooks();
  const { loading, setLoading, error, setError } = PhonesHooks();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [visibleDevices, setVisibleDevices] = useState<DeviceShort[]>([]);
  const amountOfPages = visibleDevices.length
    ? Math.ceil(
      devicesOnPage.length /
        (items !== 'all' ? +items : visibleDevices.length),
    )
    : 1;
  const pagesArray = Array.from(
    { length: amountOfPages },
    (_, index) => index + 1,
  );
  const visiblePages = pagesArray.filter(curPage => {
    if (curPage < page) {
      return page - curPage <= 2;
    }

    return curPage - page <= 2;
  });

  const location = useLocation();
  const categories = ['phones', 'tablets', 'accessories'];

  const currentCategory = categories.find(category =>
    location.pathname.includes(category),
  );

  useEffect(() => {
    if (currentDevice) {
      navigate(`/${currentDevice.category}/productId=${currentDevice.id}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDevice]);

  useEffect(() => {
    setLoading(true);

    getData<DeviceShort[]>('products')
      .then(data => {
        const devicesFromServer = data.filter(
          prod => prod.category === currentCategory,
        );

        setDevicesOnPage(devicesFromServer);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sortedDevices = sortItems(devicesOnPage, searchParams);

    setVisibleDevices(sortedDevices);
  }, [devicesOnPage, searchParams]);

  return (
    <>
      {loading && <Loader />}
      {error && <p>Error</p>}
      {!loading && !error && (
        <>
          <div className="inlineContainer">
            {currentCategory && (
              <>
                <Tree />
                <h1>
                  {
                    {
                      phones: 'Mobile phones',
                      tablets: 'Tablets',
                      accessories: 'Accessories',
                    }[currentCategory]
                  }
                </h1>
              </>
            )}

            <p className={classNames(styles.quantity, 'body-text')}>
              {loading ? <Loader /> : `${devicesOnPage.length} models`}
            </p>

            <Sorting />

            <div className={styles.list}>
              <ProductListBig items={visibleDevices} />
            </div>

            <div className={styles.pages}>
              <button
                className={classNames(styles.pages__arrow, 'body-text')}
                onClick={() => {
                  setPage(prev => (prev === 1 ? 1 : prev - 1));
                }}
              >
                <img
                  className={styles.pages__arrowImg}
                  src={arrowLeft}
                  alt="arrowLeft"
                />
              </button>
              {visiblePages.map((thePage, index) => (
                <button
                  className={classNames(
                    styles.pages__nums,
                    {
                      [styles['pages__nums--active']]: page === thePage,
                    },
                    'body-text',
                  )}
                  key={index}
                  onClick={() => setPage(thePage)}
                >
                  {thePage}
                </button>
              ))}
              <button
                className={classNames(styles.pages__arrow, 'body-text')}
                onClick={() =>
                  setPage(prev =>
                    prev === pagesArray.length ? pagesArray.length : prev + 1,
                  )
                }
              >
                <img
                  className={styles.pages__arrowImg}
                  src={arrowRight}
                  alt="arrowRight"
                />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const Devices = () => {
  return (
    <PhonesContextProvider>
      <Devices1 />
    </PhonesContextProvider>
  );
};

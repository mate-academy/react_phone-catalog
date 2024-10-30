import { Link, useParams } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import './OldPhoneOffer.scss';
import Slider from 'react-slick';
import { useContext, useEffect } from 'react';
import { CatalogContext } from '../CatalogProvider';
import { DiscountProduct } from '../OldProductCard/OldProductCard';
import classNames from 'classnames';
import { OldProduct } from '../types/OldProducts';

export const OldPhoneOffer = () => {
  const { oldItemId } = useParams();
  const {
    oldProducts,
    oldProductOffers,
    setOldProducts,
    favouriteOldItems,
    setFavouriteOldItems,
    oldAddedItems,
    setOldAddedItems,
    amountOfOldModels,
    totalOldProductsPrice,
    setTotalOldProductsPrice,
    setTotalOldModels,
    totalOldModels,
  } = useContext(CatalogContext);
  const proposedPhones = oldProducts.filter(
    product => product.type === 'phone',
  );

  useEffect(() => {
    const updateOldProducts = oldProducts.map(product => {
      const updateOffers = oldProductOffers.find(
        productOffer => productOffer.id === product.id,
      );

      return {
        ...product,
        productData: updateOffers || null,
      };
    });

    setOldProducts(updateOldProducts);
  }, []);

  const selectedProduct = oldProducts.find(product => product.id === oldItemId);
  const settings = {
    className: 'oldphoneoffer__phoneslider',
    arrows: false,
    dots: true,
    appendDots: (dots: number) => (
      <ul
        style={{
          width: '320px',
          height: '49px',
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
        }}
      >
        {dots}
      </ul>
    ),
    customPaging: (i: number) => (
      <img
        style={{ width: '51.2px', height: '49px', objectFit: 'contain' }}
        src={selectedProduct?.productData?.images[i]}
        className="oldphoneoffer__images"
      ></img>
    ),
  };

  const secondSettings = {
    infinite: false,
    arrows: true,
    className: 'oldphoneoffer__proposition',
  };

  const addOldProduct = (oldItem: OldProduct) => {
    const readyToAdd = oldAddedItems.some(item => item.id === oldItem.id);

    if (
      oldItem.id === oldItemId &&
      oldAddedItems.find(item => item.id === oldItem.id)
    ) {
      const updateItem = oldAddedItems.filter(item => item.id !== oldItem.id);

      setFavouriteOldItems(updateItem);
      setTotalOldModels(totalOldModels - amountOfOldModels);
      setTotalOldProductsPrice(
        totalOldProductsPrice - amountOfOldModels * oldItem.price,
      );
    }

    if (
      oldItem.id === oldItemId &&
      !oldAddedItems.find(item => item.id === oldItem.id)
    ) {
      setTotalOldModels(totalOldModels + 1);
      setTotalOldProductsPrice(totalOldProductsPrice + oldItem.price);
      setOldAddedItems([...oldAddedItems, oldItem]);
    }

    if (readyToAdd) {
      const updateItem = oldAddedItems.filter(item => item.id !== oldItem.id);

      setOldAddedItems(updateItem);
    }
  };

  const addProductToFavourite = (oldItem: OldProduct) => {
    const readyToAddItem = favouriteOldItems.some(
      item => item.id === oldItem.id,
    );

    if (oldItem.id !== oldItemId) {
      const updateItem = favouriteOldItems.filter(
        item => item.id !== oldItem.id,
      );

      setFavouriteOldItems(updateItem);
    } else {
      setFavouriteOldItems([...favouriteOldItems, oldItem]);
    }

    if (readyToAddItem) {
      const updateItem = favouriteOldItems.filter(
        item => item.id !== oldItem.id,
      );

      setFavouriteOldItems(updateItem);
    }
  };

  return (
    <>
      <Navigation />
      <div className="oldphoneoffer">
        <div className="oldphoneoffer__breadcrumbs">
          <Link to="/">
            <div className="oldphoneoffer__breadcrumbs--home" />
          </Link>
          <div className="oldphoneoffer__breadcrumbs--arrow" />
          <Link
            className="oldphoneoffer__breadcrumbs--text-active"
            to="/phones"
          >
            <div>Phones</div>
          </Link>
          <div className="oldphoneoffer__breadcrumbs--arrow" />
          <div className="oldphoneoffer__breadcrumbs--text">{oldItemId}</div>
        </div>
        <Link to="/phones" className="oldphoneoffer__breadcrumbs--back-button">
          <div className="oldphoneoffer__breadcrumbs--back-arrow"></div> Back
        </Link>
        <h1 className="oldphoneoffer__title">{selectedProduct?.name}</h1>

        <Slider {...settings}>
          {selectedProduct?.productData?.images.map((product, i) => (
            <img key={i} src={product} />
          ))}
        </Slider>

        <div className="oldphoneoffer__panel--buttons">
          {selectedProduct && (
            <button
              className="oldphoneoffer__panel--adding-button"
              onClick={() => addOldProduct(selectedProduct)}
            >
              {oldAddedItems.find(item => item.id === selectedProduct.id)
                ? 'ADDED'
                : 'Add to cart'}
            </button>
          )}
          {selectedProduct && (
            <button
              className={classNames('oldphoneoffer__panel--heart-button', {
                'oldphoneoffer__panel--heart-button--is-active':
                  favouriteOldItems.find(item => item.id === oldItemId),
              })}
              onClick={() => addProductToFavourite(selectedProduct)}
            ></button>
          )}
        </div>
        <div className="oldphoneoffer__description">
          <h1 className="oldphoneoffer__description--header">Description</h1>
          <h2 className="oldphoneoffer__description--title">
            Additional Features
          </h2>
          <div className="oldphoneoffer__features">
            {selectedProduct?.productData?.additionalFeatures}
          </div>
          <h2 className="oldphoneoffer__description--title">
            Work Faster, Better, more Efficient
          </h2>
          <div className="oldphoneoffer__features">
            {selectedProduct?.productData?.description}
          </div>
          <h1 className="oldphoneoffer__description--header">Tech Specs</h1>
          <div className="oldphoneoffer__description--techspec">
            <div className="oldphoneoffer__description--spec">
              <h3 className="oldphoneoffer__description--name">System</h3>
              <div className="oldphoneoffer__description--data">
                {`${selectedProduct?.productData?.android.os} ${selectedProduct?.productData?.android.ui}`}
              </div>
            </div>
            <div className="oldphoneoffer__description--spec">
              <h3 className="oldphoneoffer__description--name">Availability</h3>
              <div className="oldphoneoffer__description--data">
                {selectedProduct?.productData?.availability.map(text =>
                  !text ? 'NO' : text,
                )}
              </div>
            </div>
            <div className="oldphoneoffer__description--spec">
              <h3 className="oldphoneoffer__description--name">Battery</h3>
              <div className="oldphoneoffer__description--battery">
                <div className="oldphoneoffer__description--data">
                  {`StandByTime: ${selectedProduct?.productData?.battery.standbyTime}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`TalkTime: ${selectedProduct?.productData?.battery.talkTime}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`Type: ${selectedProduct?.productData?.battery.type}`}
                </div>
              </div>
            </div>
            <div className="oldphoneoffer__description--spec">
              <h3 className="oldphoneoffer__description--name">Camera</h3>
              <div className="oldphoneoffer__description--data">
                {`Features: ${selectedProduct?.productData?.camera.features}`}
              </div>
              <div className="oldphoneoffer__description--data">
                {`Primary: ${selectedProduct?.productData?.camera.primary}`}
              </div>
            </div>
            <div className="oldphoneoffer__description--spec">
              <h3 className="oldphoneoffer__description--name">Connectivity</h3>
              <div className="oldphoneoffer__description--connectivity">
                <div className="oldphoneoffer__description--data">
                  {`${selectedProduct?.productData?.connectivity.bluetooth} `}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`Cell: ${selectedProduct?.productData?.connectivity.cell === '' ? 'NO' : selectedProduct?.productData?.connectivity.cell}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`GPS: ${selectedProduct?.productData?.connectivity.gps ? 'YES' : 'NO'}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`INFRARED: ${selectedProduct?.productData?.connectivity.infrared ? 'YES' : 'NO'}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`WiFi: ${selectedProduct?.productData?.connectivity.wifi}`}
                </div>
              </div>
            </div>
            <div className="oldphoneoffer__description--spec">
              <h3 className="oldphoneoffer__description--name">Display</h3>
              <div className="oldphoneoffer__description--display">
                <div className="oldphoneoffer__description--data">
                  {`ScreenResolution: ${selectedProduct?.productData?.display.screenResolution}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`Screen Size: ${selectedProduct?.productData?.display.screenSize}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`Touch Screen: ${selectedProduct?.productData?.display.touchScreen ? 'YES' : 'NO'}`}
                </div>
              </div>
            </div>
            <div className="oldphoneoffer__description--spec">
              <h3 className="oldphoneoffer__description--name">Hardware</h3>
              <div className="oldphoneoffer__description--hardware">
                <div className="oldphoneoffer__description--data">
                  {`Accelerometer: ${selectedProduct?.productData?.hardware.accelerometer ? 'YES' : 'NO'}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`AudioJack: ${selectedProduct?.productData?.hardware.audioJack}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`CPU: ${selectedProduct?.productData?.hardware.cpu}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`FMRadio: ${selectedProduct?.productData?.hardware.fmRadio ? 'YES' : 'NO'}`}
                </div>
                <div className="oldphoneoffer__description--data">
                  {`USB: ${selectedProduct?.productData?.hardware.usb}`}
                </div>
              </div>
            </div>
            <div className="oldphoneoffer__description--spec">
              <h3 className="oldphoneoffer__description--name">
                Size and weight
              </h3>
              <div className="oldphoneoffer__description--dimensions">
                <div className="oldphoneoffer__description--data">
                  {selectedProduct?.productData?.sizeAndWeight.dimensions.map(
                    text => `Dimensions: ${text}\
                  `,
                  )}
                </div>
                <div className="oldphoneoffer__description--data">{`Weight: ${selectedProduct?.productData?.sizeAndWeight.weight}`}</div>{' '}
              </div>
            </div>
            <div className="oldphoneoffer__description--spec">
              <h3 className="oldphoneoffer__description--name">Storage</h3>
              <div className="oldphoneoffer__description--data">
                {`Flash: ${selectedProduct?.productData?.storage.flash}`}
              </div>
              <div className="oldphoneoffer__description--data">
                {`RAM: ${selectedProduct?.productData?.storage.ram}`}
              </div>
            </div>
          </div>

          <div className="oldphoneoffer__slider">
            <div className="oldphoneoffer__slider--header">
              You may also like
            </div>

            <Slider {...secondSettings}>
              {proposedPhones.map(proposedPhone => (
                <DiscountProduct
                  discountProduct={proposedPhone}
                  key={proposedPhone.id}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

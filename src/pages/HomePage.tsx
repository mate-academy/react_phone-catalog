import { useEffect, useState } from 'react';
import cn from 'classnames';
import sliderImage from '../images/banner-phones.png';
import sliderImage1 from '../images/banner-tablets.png';
import sliderImage2 from '../images/banner-accessories.png';

import { useFetching } from '../helpers/UseFetchig';
import { Product } from '../types/Product';
import { ProductsSlider } from '../components/ProductsSlider/ProductsSlider';
import Loader from '../components/Loader/Loader';
import { ShopByCategory } from '../components/ShopByCategory/ShopByCategory';
import { URL_PRODUCTS } from '../helpers/Url';

export const HomePage = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [expensiveProducts, setExpensiveProducts] = useState<Product[]>([]);
  const [amountOfDevices, setAmountOfDevices] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderImages = [sliderImage, sliderImage1, sliderImage2];

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const changeToRight = () => {
    if (sliderIndex >= 2) {
      setSliderIndex(0);
    } else {
      setSliderIndex(prevIndex => prevIndex + 1);
    }
  };

  const changeToLeft = () => {
    if (sliderIndex < 1) {
      setSliderIndex(2);
    } else {
      setSliderIndex(prevIndex => prevIndex - 1);
    }
  };

  const getAmountOfDevices = async () => {
    const response = await fetch(URL_PRODUCTS);
    const data = await response.json();
    const phonesAmount = data.filter(
      (device: Product) => device.type === 'phone',
    ).length;
    const tabletsAmount = data.filter(
      (device: Product) => device.type === 'tablet',
    ).length;
    const accessoriesAmount = data.filter(
      (device: Product) => device.type === 'accessory',
    ).length;

    setAmountOfDevices({
      ...amountOfDevices,
      phones: phonesAmount,
      tablets: tabletsAmount,
      accessories: accessoriesAmount,
    });
  };

  const getHotPriceProducts = async () => {
    const response = await fetch(URL_PRODUCTS);
    const data = await response.json();
    const filteredData = data.filter((product: Product) => product.discount);

    setDiscountedProducts(filteredData);
  };

  const getBrandNewProducts = async () => {
    const response = await fetch(URL_PRODUCTS);
    const data = await response.json();
    const filteredData = data.filter((product: Product) => !product.discount);
    const sortedData = filteredData.sort(
      (a: Product, b: Product) => b.price - a.price,
    );

    setExpensiveProducts(sortedData);
  };

  const [
    fetchDiscoutedProducts,
    isLoadingDiscountetProducts,
    isErrorDiscountedProducts,
  ] = useFetching(getHotPriceProducts);

  const [
    fetchExpensiveProducts,
    isLoadingExpensiveProducts,
    isErrorExpensiveProducts,
  ] = useFetching(getBrandNewProducts);

  useEffect(() => {
    fetchDiscoutedProducts();
    fetchExpensiveProducts();
    getAmountOfDevices();
  }, []);

  return (
    <div className="container">
      <div className="container--center">
        <div className="slider-wrapper">
          <div className="slider" id="top">
            <button
              className="slider__button slider__button--left"
              type="button"
              onClick={changeToLeft}
            >
              {'<'}
            </button>
            <img
              src={sliderImages[sliderIndex]}
              alt="iPhones"
              className="slider__image"
            />
            <button
              className="slider__button slider__button--right"
              type="button"
              onClick={changeToRight}
            >
              {'>'}
            </button>
          </div>
          <div className="slider-point-wrapper">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSliderIndex(0)}
              onKeyPress={() => setSliderIndex(0)}
              aria-label="button"
              className={
                cn('slider-point', {
                  'slider-point--active': !sliderIndex,
                })
              }
            />

            <div
              role="button"
              tabIndex={0}
              onClick={() => setSliderIndex(1)}
              onKeyPress={() => setSliderIndex(1)}
              aria-label="button"
              className={
                cn('slider-point', {
                  'slider-point--active': sliderIndex === 1,
                })
              }
            />

            <div
              role="button"
              tabIndex={0}
              onClick={() => setSliderIndex(2)}
              onKeyPress={() => setSliderIndex(2)}
              aria-label="button"
              className={
                cn('slider-point', {
                  'slider-point--active': sliderIndex === 2,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="hot-prices">
        {isLoadingDiscountetProducts && !isErrorDiscountedProducts && (
          <Loader />
        )}
        <ProductsSlider title="Hot prices" products={discountedProducts} />
      </div>

      <ShopByCategory amountOfDevices={amountOfDevices} />

      <div className="brand-new-models">
        {isLoadingExpensiveProducts && !isErrorExpensiveProducts && <Loader />}
        <ProductsSlider title="Brand new models" products={expensiveProducts} />
      </div>
    </div>
  );
};

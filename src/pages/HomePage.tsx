import { useEffect, useState } from 'react';
import sliderImage from '../images/home-page-slider-picture1.png';

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
            <button className="slider__button" type="button">
              {'<'}
            </button>
            <img src={sliderImage} alt="iPhones" />
            <button className="slider__button" type="button">
              {'>'}
            </button>
          </div>
          <div className="slider-point-wrapper">
            <div className="slider-point slider-point--active" />
            <div className="slider-point" />
            <div className="slider-point" />
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

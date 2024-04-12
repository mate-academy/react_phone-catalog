import { useEffect, useState } from 'react';
import sliderImg1 from '../../images/banner/banner-phones.png';
import sliderImg2 from '../../images/banner/banner-tablets.png';
import sliderImg3 from '../../images/banner/banner-accessories.png';
import { Carousel } from '../../components/Carousel/Carousel';
import { Categorys } from '../../components/Categorys/Categorys';
import { Products } from '../../types/Products';
import { fetchProducts } from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SliderSwiper } from '../../components/SliderSwiper/SliderSwiper';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const slides = [
    sliderImg1,
    sliderImg2,
    sliderImg3,
  ];
  // const [productsData, setProductsData] = useState<Products[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Products[]>([]);
  const [newModels, setNewModels] = useState<Products[]>([]);

  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(state => state.products);

  // const loadProductsData = async () => {
  //   try {
  //     // setIsPhonesDataLoading(true);
  //     const getProductsData = await getAllData('products');

  //     setProductsData(getProductsData);
  //   } catch (error) {
  //     Error('Error');
  //     // setIsPhonesDataLoading(false);
  //   } finally {
  //     // setIsPhonesDataLoading(false);
  //   }
  // };

  const loadProductsData = (data: string) => {
    dispatch(fetchProducts(data));
  };

  // const getHotPriceProducts = async () => {
  //   try {
  //     // setIsPhonesDataLoading(true);
  //     const getProductsData = await getAllData('products');

  //     const dataHotPriceProducts
  //       = getProductsData.filter(product => product.price < 500);

  //     setHotPriceProducts(dataHotPriceProducts);
  //   } catch (error) {
  //     Error('Error');
  //     // setIsPhonesDataLoading(false);
  //   } finally {
  //     // setIsPhonesDataLoading(false);
  //   }
  // };

  const getHotPriceProducts = () => {
    const dataHotPriceProducts
      = products.filter(product => product.price < 500);

    setHotPriceProducts(dataHotPriceProducts);
  };

  // const getBrandNewProducts = async () => {
  //   try {
  //     // setIsPhonesDataLoading(true);
  //     const dataProducts = await getAllData('products');
  //     const dataNewModels
  //       = dataProducts.filter(product => product.year === 2022);
  //     // const dataNewModelsSorted
  //     // = [...dataNewModels].sort((a, b) => b.price - a.price);

  //     setNewModels(dataNewModels);
  //   } catch (error) {
  //     Error('Error');
  //     // setIsPhonesDataLoading(false);
  //   } finally {
  //     // setIsPhonesDataLoading(false);
  //   }
  // };
  const getBrandNewProducts = () => {
    const dataNewModels
      = products.filter(product => product.year >= 2022);

    setNewModels(dataNewModels);
  };

  useEffect(() => {
    if (status === 'idle') {
      loadProductsData('products');
    }
  }, [dispatch, status]);

  useEffect(() => {
    getHotPriceProducts();
    getBrandNewProducts();
  }, [products]);

  return (
    <>
      <Carousel slides={slides} />

      {/* <ProductsSlider
        title="Hot prices"
        productsData={hotPriceProducts}
      /> */}
      {status === 'loading' ? (
        <Loader />
      ) : (
        <SliderSwiper
          title="Hot prices"
          productsData={hotPriceProducts}
        />
      )}
      <Categorys
        productsData={products}
      />
      {/* <ProductsSlider
        title="Brand new models"
        productsData={newModels}
      /> */}
      {status === 'loading' ? (
        <Loader />
      ) : (
        <SliderSwiper
          title="Hot prices"
          productsData={newModels}
        />
      )}
    </>

  );
};

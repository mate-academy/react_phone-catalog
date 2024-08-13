import { useEffect, useState } from 'react';
import './homePage.scss';
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
import { Footer } from '../../components/Footer';

export const HomePage = () => {
  const slides = [sliderImg1, sliderImg2, sliderImg3];
  const [hotPriceProducts, setHotPriceProducts] = useState<Products[]>([]);
  const [newModels, setNewModels] = useState<Products[]>([]);

  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(state => state.products);

  const loadProductsData = (data: string) => {
    dispatch(fetchProducts(data));
  };

  const getHotPriceProducts = () => {
    const dataHotPriceProducts = products.filter(
      product => product.price < 500,
    );

    setHotPriceProducts(dataHotPriceProducts);
  };

  const getBrandNewProducts = () => {
    const dataNewModels = products.filter(product => product.year >= 2022);

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
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <h1 className="homePage__title">Welcome to Nice Gadgets store!</h1>
            <Carousel slides={slides} />
            <SliderSwiper
              title="Brand new models"
              productsData={hotPriceProducts}
            />
            <Categorys productsData={products} />
            <SliderSwiper title="Hot prices" productsData={newModels} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

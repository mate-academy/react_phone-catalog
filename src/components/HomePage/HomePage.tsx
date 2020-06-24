import React, { useState, useEffect } from 'react';
import ImageSlider from '../ImageSlider/ImageSlider';
import ShopByCategories from '../ShopByCategories/ShopByCategories';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import { getProducts } from '../../helpers/api';

const HomePage = () => {
  const [hotPrice, setHotPrice] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [data, setData] = useState<Product[]>([]);


  // useEffect(() => {
  //   getProducts()
  //     .then(data => sethotPrice(data.filter((product: Product) => product.discount !== 0)));
  // }, []);

  // const visibleProducts = useMemo(() => {
  //   return hotPrice.sort((a: Product, b: Product) => a.discount - b.discount));
  // }, [data]);

  useEffect(() => {
    const loadData = async () => {
      const loadedProduct = await getProducts();

      setData(loadedProduct);
    };

    loadData();
  }, []);


  useEffect(() => {
    setHotPrice(data
      .filter((product: Product) => product.discount !== 0)
      .sort((a: Product, b: Product) => a.discount - b.discount));
  }, [data]);

  useEffect(() => {
    setNewModels(data
      .filter((product: Product) => product.discount === 0)
      .sort((a: Product, b: Product) => a.age - b.age));
  }, [data]);

  return (
    <>

      <ImageSlider />
      <ProductsSlider title="Hot Prices" visibleProducts={hotPrice} />
      <ShopByCategories />
      <ProductsSlider title="Brand New Models" visibleProducts={newModels} />
    </>
  );
};

export default HomePage;

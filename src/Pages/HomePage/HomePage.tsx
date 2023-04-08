import { useEffect, useState } from 'react';
import { Slider } from '../../Components/Slider/Slider';
import { Loader } from '../../Components/Loader';
import { getProducts, getPoductsByCategory } from '../../Helpers/Helpers';
import { Product } from '../../Types/Product';

import './HomePage.scss';
import { Carousel } from '../../Components/Carousel/Carousel';
import { ShopByCategory } from '../../Components/ShopPyCategory/ShopByCategory';

type Props = {
  setIsLoader: (value: boolean) => void,
  isLoader: boolean,
  searchParams: URLSearchParams,
};

export const HomePage: React.FC<Props> = ({ setIsLoader, isLoader }) => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [sliceNum, setSliceNum] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 400) {
      setSliceNum(0);
    } else {
      setSliceNum(1);
    }
  }, [window.innerWidth]);

  const preparetedSortedProucts = phones.sort((a, b) => {
    return (a.fullPrice - a.price) - (b.fullPrice - b.price);
  }).slice(sliceNum);

  const preparatedNewTodos = phones.sort((a, b) => {
    return b.year - a.year;
  }).slice(sliceNum);

  const loadProductsData = async () => {
    try {
      setIsLoader(true);

      const productsData = await getProducts();
      const phonesData = getPoductsByCategory(productsData, 'phones');
      const tabletsData = getPoductsByCategory(productsData, 'tablets');
      const accesooriesData = getPoductsByCategory(productsData, 'accessories');

      setPhones(phonesData);
      setTablets(tabletsData);
      setAccessories(accesooriesData);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    loadProductsData();
  }, []);

  return (
    <section className="home">
      {isLoader ? (
        <Loader />
      ) : (
        <div className="container">
          <Slider />

          <Carousel
            products={preparetedSortedProucts}
            title="Hot Prices"
          />

          <ShopByCategory
            phones={phones}
            tablets={tablets}
            accessories={accessories}
          />

          <Carousel
            products={preparatedNewTodos}
            title="Brand new models"
          />
        </div>
      )}
    </section>
  );
};

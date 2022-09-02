import { useEffect, useState } from 'react';
import { Slider } from '../../Components/Slider/Slider';
import { ProductsSlider } from '../../Components/ProductsSlider/ProductsSlider';
import { useFetch } from '../../hooks/useFetch';
import { Phone } from '../../types/Phone';
import { ShopByCategory } from '../../Components/shopByCategory/ShopByCategory';
import './Home.scss';

export const Home: React.FC = () => {
  const { getFetch } = useFetch();
  const [dataFromServer, setDataFromServer] = useState<Phone[] | null>(null);
  const [hotPrices, setHotPrices] = useState<Phone[]>([]);
  const [brandNewModels, setBrandNewModels] = useState<Phone[]>([]);

  useEffect(() => {
    getFetch()
      .then(res => {
        if (res) {
          setDataFromServer(res);
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
  }, []);

  useEffect(() => {
    if (dataFromServer) {
      const hotPricesArray = dataFromServer
        .filter(el => el.discount !== 0)
        .sort((a, b) => b.discount - a.discount);

      setHotPrices(hotPricesArray);
    }

    if (dataFromServer) {
      const brandNewArray = dataFromServer
        .sort((a, b) => b.age - a.age);

      setBrandNewModels(brandNewArray);
    }
  }, [dataFromServer]);

  return (
    <div className="Home">
      <div className="Home__wrapper">
        <Slider />
        <ProductsSlider
          productArray={hotPrices}
          description="Hot Prices"
        />
        <ShopByCategory />
        <ProductsSlider
          productArray={brandNewModels}
          description="Brand new models"
        />
      </div>
    </div>
  );
};

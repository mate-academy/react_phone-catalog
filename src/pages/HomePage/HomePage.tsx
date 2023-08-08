import { useEffect, useState } from 'react';
import './style.scss';
import {
  getData,
  getHotPriceProducts,
  getBrandNewProducts,
} from '../../api/dataOfProducts';
import { Phone } from '../../types/phone';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { SliderBanner } from '../../components/SliderBanner';
import { dataSlider } from '../../helpers/constants';

export const HomePage = () => {
  const [hotGoods, setHotGoods] = useState<Phone[]>([]);
  const [newGoods, setNewGoods] = useState<Phone[]>([]);

  const loadGoods = async () => {
    try {
      const dataFromServer = await getData();
      const dataHotGoods = getHotPriceProducts(dataFromServer);
      const dataBrandNew = getBrandNewProducts(dataFromServer);

      setHotGoods(dataHotGoods);
      setNewGoods(dataBrandNew);
    } catch {
      window.console.log('some error');
    }
  };

  useEffect(() => {
    loadGoods();
  }, []);

  return (
    <>
      <SliderBanner dataSlider={dataSlider} />
      <div className="block hotPrices">
        <ProductsSlider
          title="Hot prices"
          items={hotGoods}
        />
      </div>
      <div className="block shopByCategory">
        <ShopByCategory />
      </div>
      <div className="block brandNew">
        <ProductsSlider
          title="Brand new models"
          items={newGoods}
          discount={false}
        />
      </div>
    </>
  );
};

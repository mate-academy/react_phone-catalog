import { useEffect, useState } from 'react';
import { ProductSlider } from '../../components/ProductSlider';
import { Slider } from '../../components/Slider';
import './HomePage.scss';

import { mobiles } from '../../temp';
import { Item } from '../../types/interface/Item';
import { ShopByCategory } from '../../components/ShopByCaregory';

export const HomePage = () => {
  const [mobs, setMobs] = useState<Item[]>([]);

  useEffect(() => {
    setMobs(mobiles);
  }, []);

  return (
    <div className="home-page">
      <Slider />
      <section className="home-page__section">
        <ProductSlider title="Hot Prices" products={mobs} />
      </section>
      <section className="home-page__section">
        <ShopByCategory />
      </section>
      <section className="home-page__section">
        <ProductSlider title="Brand new models" products={mobs} />
      </section>

    </div>
  );
};

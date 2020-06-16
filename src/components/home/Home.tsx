import React, { useEffect, useState } /*{ useState }*/ from 'react';
import Banner from '../banner/Banner';
import { IGood, getGoods } from '../../provider/dataFromApi';
import HotPrice from "../hotPrice/HotPrice";
import Brands from "../brands/Brands";

 type Props = { goods: IGood[] };


export const Home: React.FC<Props> = () => {

  const [goods, setGoods] = useState<IGood[]>([]);
  useEffect(() => {
    getGoods()
      .then(data => {
        setGoods(data);
      });
  }, []);

  return (
    <div>
      <Banner />
      <h1 className="block__title"> Hot prices</h1>
      <HotPrice wigthSlides={-25} goods={goods} />
      <h1 className="block__title"> Brands</h1>
      <Brands wigthSlides={-25} goods={goods} />
    </div>
  )
};


export default Home;


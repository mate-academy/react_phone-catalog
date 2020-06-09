import React, { useEffect, useState } /*{ useState }*/ from 'react';
import Banner from '../banner/Banner';
import { GoodList } from '../goodList/GoodList';
import { IGood, getGoods } from '../../provider/dataFromApi';

 type Props = {
    goods: IGood[];
 };


export const Home: React.FC<Props> = () => {

  const [goods, setGoods] = useState<IGood[]>([]);
  useEffect(() => {
    getGoods()
      .then(data => {
        setGoods(data);
      });
  }, []);

  // const loadAllGoods = () => {
  //   getGoods().then(goods => {
  //     //setGoods(goods);
  //     _goods = goods;
  //   }).catch(error => console.error(error)
  //   ).finally(/*//TODO:  set isLoaded = false */);

  // }

  // getGoods()
  // .then(setGoods);

  return (
    <div>
      <Banner />
      <GoodList goods={goods}/>
    </div>
  )
};
      {/* <DataFromApi /> */}
    </div>
  );
};

export default Home;


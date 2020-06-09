import React from 'react';
import Banner from '../../../banner/Banner';
// import { GoodList } from '../goodList/GoodList';
// import { IGood, getGoods } from '../../../../helpers/dataFromApi'
//  type Props = {
//    goods: IGood[];
//  };


export const Home = () => {
  // const [goods, setGoods] = useState<IGood[]>([]);

  // useEffect(() => {
  //   getGoods()
  //     .then(data => {
  //       setGoods(data);
  //     });
  // }, []);

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
      {/* <GoodList goods={goods} /> */}
    </div>
  );
};

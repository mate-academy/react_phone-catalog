import React from 'react';

import Banner from '../banner/Banner';
import HotPrice from '../hotPrice/HotPrice';


const Home = () => {
  return (
    <div>
      <Banner />
      <h1 className="block__title"> Hot prices</h1>
      <HotPrice />

    </div>
  );
};


export default Home;

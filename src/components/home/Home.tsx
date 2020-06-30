import React from 'react';
import Banner from '../banner/Banner';
import HotPrice from "../hotPrice/HotPrice";
import Brands from "../brands/Brands";



const Home = () => {
  return (
    <div>
      <Banner />
      <h1 className="block__title"> Hot prices</h1>
      <HotPrice wigthSlides={-25} />
      <h1 className="block__title"> Brands</h1>
      <Brands wigthSlides={-25} />


    </div>
  );
};


export default Home;

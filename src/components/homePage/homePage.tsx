import React, {useEffect, useState} from 'react';
import HomeSlider from "./homeSlider/homeSlider";
import {getProducts} from "../../helpers/api";
import HotPrices from "./hotPrices/hotPrices";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phonesFromServer, setPhonesFromServer] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    getProducts().then(data => setPhonesFromServer(data));

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if(isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <HomeSlider />
      <HotPrices gadgets={phonesFromServer}/>
    </div>
  )
};

export default HomePage;

import { useEffect, useState } from 'react';
import { Phone } from '../../types/phone';
import { Home } from '../Home/Home';
import { HotPrice } from '../HotPrice/HotPrice';
import { Category } from '../category/Category';
import { NewModel } from '../newModel/NewModel';

export const HomeTab = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [showOldPrice, setShowOldPrice] = useState(false);

  useEffect(() => {
    setShowOldPrice(true);
    fetch('api/products.json')
      .then(response => response.json())
      .then(data => setPhones(data));
  }, []);

  return (
    <div className="container">
      <Home />
      <HotPrice
        phones={phones}
        title="Hot prices"
        showOldPrice={showOldPrice}
      />
      <Category />
      <NewModel
        phones={phones}
        title="Brand new models"
        showOldPrice={false}
      />
    </div>
  );
};

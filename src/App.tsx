import React, { useState, useEffect} from 'react';
import { PRODUCTS_URL, getData, getDetails } from './helpers/Api';
import { PhoneInfo, ProductDetails, Phone } from './interfaces';
import { Navigation } from './components/Navigation';

import './styles/App.scss';


const App: React.FC = () => {
  const [phonesInfo, setPhonesInfo] = useState<PhoneInfo[]>([]);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [details, setDetails] = useState<ProductDetails[]>([]);
  console.log(phones)
  const findDetail = (id: string) => {
    return details.find(detail => detail.id ===id);
  }

  useEffect(() => {
    const preparedPhones = phonesInfo.map(phone => ( {
      ...phone,
      details: findDetail(phone.id)
    }))

    setPhones(preparedPhones)
  }, [phonesInfo, details]);

  useEffect(() => {
    const getPhonesFromServer = async () => {
      const phonesList = await getData<PhoneInfo>(PRODUCTS_URL);
      setPhonesInfo(phonesList);
    };

    getPhonesFromServer();
  }, []);


  useEffect(() => {
    let list: any = [];
    for (const phone of phonesInfo) {
      const getDetailsFromServer = async () => {
        const detail = await getDetails<ProductDetails>(phone.id);
        list.push(detail)
        setDetails([...list])
      };

      getDetailsFromServer();
    }
  }, [phonesInfo]);

  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;

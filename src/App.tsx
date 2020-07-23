import React, { useState, useEffect} from 'react';
import { PRODUCTS_URL, getData, getDetails } from './helpers/Api';
import { PhoneInfo, ProductDetails } from './interfaces';
import { Navigation } from './components/Navigation';
import { useDispatch } from 'react-redux';
import { setPhones } from './store/phones';

import './styles/App.scss';


const App: React.FC = () => {
  const dispatch = useDispatch();
  const [phonesInfo, setPhonesInfo] = useState<PhoneInfo[]>([]);
  const [details, setDetails] = useState<ProductDetails[]>([]);
  const findDetail = (id: string) => {
    return details.find(detail => detail.id ===id);
  }

  useEffect(() => {
    const preparedPhones = phonesInfo.map(phone => ( {
      ...phone,
      details: findDetail(phone.id)
    }))

    dispatch(setPhones(preparedPhones))
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

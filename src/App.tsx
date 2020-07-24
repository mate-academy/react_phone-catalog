import React, { useState, useEffect} from 'react';
import { PRODUCTS_URL, getData, getDetails } from './helpers/Api';
import { PhoneInfo, ProductDetails } from './interfaces';
import { Navigation } from './components/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setPhones } from './store/phones';
import { getBasket } from './store/index';
import {  Switch, Route, Redirect} from 'react-router-dom';
import { Home } from './components/Home';
import { ItemCard } from './components/ItemCard';
import { FooterNav } from './components/FooterNav';
import { Basket } from './components/Basket';



import './styles/App.scss';


const App: React.FC = () => {
  const dispatch = useDispatch();
  const [phonesInfo, setPhonesInfo] = useState<PhoneInfo[]>([]);
  const [details, setDetails] = useState<ProductDetails[]>([]);
  const basket = useSelector(getBasket);
  const findDetail = (id: string) => {
    return details.find(detail => detail.id ===id);
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([...basket]));
  }, [basket]);

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
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/home"><Redirect to="/" /></Route>
        <Route path="/tablets/"/>
        <Route path="/accessories/"/>
        <Route path="/favorite/"/>
        <Route path="/basket/" component={Basket}/>
        <Route path="/phones/:productId" render={({ match }) => <ItemCard id={match.params.productId} />}/>
        <Route path="/phones/"/>
      </Switch>
      <FooterNav />
    </div>
  );
}

export default App;

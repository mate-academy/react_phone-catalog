import './App.scss';
import { useEffect, useState } from 'react';

import { HomePage } from './components/homePage/HomePage';

export const App = () => {
  const [phones, setPhones] = useState();
  console.log(phones)
  useEffect(() => {
    fetch('/api/products.json').then(res=>res.json())
    .then(data=>setPhones(data))
  },[])
  return <HomePage phones={phones} />;
};


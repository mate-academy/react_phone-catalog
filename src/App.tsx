import './App.scss';
import { useEffect, useState } from 'react';


import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';


export const App = () => {
  const [phones, setPhones] = useState();
  console.log(phones)
  useEffect(() => {
    fetch('/api/products.json').then(res=>res.json())
    .then(data=>setPhones(data))
  },[])
  return (<><Header />
    <h2>






















</h2>
    <Footer />
  </>)
};


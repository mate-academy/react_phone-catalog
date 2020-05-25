import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { getGoods } from './helpers/api';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import './styles/main.scss';

const App = () => {
  const [goods, setDataGoods] = useState<Good[]>([])

  const loadGoods = async () => {
    const data = await getGoods();
    setDataGoods(data);
  }

  useEffect(() => {
    loadGoods();
  }, [])

  console.log(goods)
    return (
    <div className="App">
      <Header />
      <Body goods={goods}/>
      <Footer />
    <div></div>
    </div>
  );
}

export default App;

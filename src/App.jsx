import React, { useEffect, useState } from 'react';
import './App.scss';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { HomePage } from './components/HomePage/HomePage';
import { getProducts } from './api/products';
import { Header } from './components/Header/Header';
import { Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { TabletsPage } from './components/TabletsPage/TabletsPage';

const App = () => {
  const [phones, setPhones] = useState([]);
  const [tablets, setTablets] = useState([]);

  useEffect(() => {
    getProducts().then(response => {
      setPhones(response.filter(product => product.type === 'phone'));
    setTablets(response.filter(product => product.type === 'tablet'))
    
  })
  }, []);

  return (
    <div className="App" >
      <Header />
      <Route path="/home/">
        <HomePage />
      </Route>
      <Route path="/phones/">
        {phones.length && <PhonesPage phones={phones} />}
      </Route>
      <Route path="/tablets/">
        {tablets.length && <TabletsPage tablets={tablets}/> }
      </Route>
      <Footer/>
    </div>
  )
}


export default App;

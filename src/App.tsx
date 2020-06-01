import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import { Navigation } from './Navigation/navigation';
import { HomePage } from './HomePage/homePage';
import { PhonesCatalog } from './PhonesCatalog/phonesCatalog';
import { Favourites } from './Favourites/favourites';
import { ShoppingCart } from './ShoppingCart/shoppingCart';
import { Footer } from './Footer/footer';
import { Accessories } from './AccessoriesCatalog/accessories';
import { TabletsCatalog } from './TabletsCatalog/tabletsCatalog';
import { ItemSpecificationCard } from './MultipurposeComponents/ItemSpecificationCard/itemSpecificationCard';
import { DFS } from './Additional/additional_api';
import { Phones } from './Additional/interfaces';

const App = () => {
  const [gadgets, setGadgets] = useState([]);
  const [phones, setPhones] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const dataFromServer = useContext(DFS);


  useEffect(() => {
    dataFromServer.then(data => setGadgets(data));
    setPhones(gadgets.filter((el: { type: string }) => el.type === 'phone'));
    setTablets(gadgets.filter((el: { type: string }) => el.type === 'tablet'));
    setAccessories(gadgets.filter((el: { type: string }) => el.type === 'accessories'));
  }, [gadgets, dataFromServer]);


  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/phones" exact component={PhonesCatalog} />
        <Route path="/tablets" exact component={TabletsCatalog} />
        <Route path="/accessories" exact component={Accessories} />
        <Route path="/favourites" component={Favourites} />
        <Route path="/cart" component={ShoppingCart} />
        {phones.map((el: Phones) => (
          <Route key={el.id} path={`/phones/${el.id}`} exact render={() => <ItemSpecificationCard route={`${el.name}`} page="Phones" gadget={el} allGadgets={phones} />} />
        ))}
        {tablets.map((el: Phones) => (
          <Route key={el.id} path={`/tablets/${el.id}`} exact render={() => <ItemSpecificationCard route={`${el.name}`} page="Tablets" gadget={el} allGadgets={tablets} />} />
        ))}
        {accessories.map((el: Phones) => (
          <Route key={el.id} path={`/accessories/${el.id}`} exact render={() => <ItemSpecificationCard route={`${el.name}`} page="Accessories" gadget={el} allGadgets={accessories} />} />
        ))}
      </Switch>
      <Footer />
    </div>
  );
};

export default App;

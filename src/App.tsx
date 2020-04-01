import React, { FC } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './views/Home/HomePage';
import { NotFound } from './components/NotFound/NotFound';
import { PhonesPage } from './views/Phones/PhonesPage';
import PhoneDetail from './components/Phones/PhoneDetail';
import { TabletsPage } from './views/Tablets/TabletsPage';
import { AccessoriesPage } from './views/Accessories/AccessoriesPage';

const App: FC = () => {
  return (
    <>
      <div className="container-fluid">
        <Header />
      </div>
      <div className="container-xl">
        <main>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/phones" exact component={PhonesPage} />
            <Route path="/tablets" component={TabletsPage} />
            <Route path="/accessories" component={AccessoriesPage} />
            <Route path="/phones/:id" component={PhoneDetail} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </>
  );
};

export default App;

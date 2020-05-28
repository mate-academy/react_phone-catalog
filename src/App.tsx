import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { BigCarousel } from './components/BigCarousel';
import { NavByImg } from './components/NavByImg';


import { Footer } from './components/Footer/Footer';

const Home = () => <h2>Home2</h2>;


const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <BigCarousel itemWidth={1040} />
        <Redirect from="/home" to="/" />
        <Route component={NotFoundPage} />
      </Switch>
      <NavByImg />
      <Footer />
    </div>
  );
};


export default App;
//синхронизация стрелок с индикаторами
//картинки странных размеров
//хидден странно работает

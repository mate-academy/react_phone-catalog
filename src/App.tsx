import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { BigCarousel } from './components/BigCarousel';
import { Footer } from './components/Footer';
import { PhonesPage } from './components/PhonesPage';

const Home = () => <h2>Home2</h2>;


const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/phones"
            component={PhonesPage}
          />
          <BigCarousel />
          <Redirect from="/home" to="/" />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};


export default App;

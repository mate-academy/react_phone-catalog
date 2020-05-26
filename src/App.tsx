import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';


const Home = () => <h2>Home2</h2>;
const Footer = () => <h2>Footer</h2>;

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
        <Redirect from="/home" to="/" />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;

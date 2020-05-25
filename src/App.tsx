import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';

const App:React.FC = () => (
  <div className="App">
    <Header />

    <Switch>
      <Route path='/home' component={() => <h1>Home</h1>}/>
      <Route path='/phones' component={() => <h1>phones</h1>}/>
      <Route path='/tablets' component={() => <h1>tablets</h1>}/>
      <Route path='/accessories' component={() => <h1>accessories</h1>}/>
    </Switch>
  </div>
);

export default App;

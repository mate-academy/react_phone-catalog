import React from 'react';
import HeaderNavigation from './Components/HeaderNavigation/HeaderNavigation';
import Main from './Components/HeaderNavigation/Main';

import './styles/App.scss';

const App: React.FC = () => (
  <div className="App">
    <HeaderNavigation />
    <Main />
  </div>
);

export default App;

import { Outlet } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header';

const App = () => (
  <div className="App">
    <Header />

    <main className="App__main">
      <Outlet />
    </main>
  </div>
);

export default App;

/* eslint-disable import/no-extraneous-dependencies */
import { Outlet } from 'react-router-dom';

import './App.scss';
import './fonts/Mont-Regular.otf';
import './fonts/Mont-Bold.otf';
import './fonts/Mont-SemiBold.otf';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App = () => (
  <div className="App">
    <Header />

    <main className="main-content">
      <div className="main-content__container">
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);

export default App;

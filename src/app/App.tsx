import './App.scss';
import { Header } from '@widgets/header';
import { Outlet } from 'react-router-dom';
import { Footer } from '@widgets/footer';
import { GlobalProvider } from '@features/index';

export const App = () => (
  <div className="App">
    <GlobalProvider>
      <Header />
      <Outlet />
      <Footer />
    </GlobalProvider>
  </div>
);

// todo: clean Categories enum, types
// make type selectors null / undefined / data => loading.LOAD === null loading.ERR etc
// make slider autoplay

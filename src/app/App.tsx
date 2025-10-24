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
    </GlobalProvider>
    <Footer />
  </div>
);

// todo: clean Categories enum, types

// refactor pagination to show only few pages not all at once
// add picture tag to bannerSlider
// add random product catalogue method

//for RM: -dataflow -api -loader -errorHandling -cssFirst

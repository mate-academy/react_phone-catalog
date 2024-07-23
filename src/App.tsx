import { Outlet } from 'react-router-dom';
import './App.scss';
import { TopBar } from './components/TopBar';
// import { Header } from './components/Header';
// import { Footer } from './components/Footer';
// import { Main } from './components/Main';

export const App = () => {
  return (
    <div className="App">
      <TopBar />

      <Outlet />
      {/* <Header /> */}
      {/* <Main />
      <Footer /> */}
    </div>
  );
};

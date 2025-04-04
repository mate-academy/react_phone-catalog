import './App.scss';
import HomePage from './modules/HomePage/HomePage';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import AsideMenu from './components/AsideMenu/AsideMenu';

export const App = () => {
  return (
    <div className="App">
      <HeaderMenu />
      <AsideMenu />

      <div className="container">
        <HomePage />
      </div>
    </div>
  );
};

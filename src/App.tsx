import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';
import { RoutesComponent } from './RoutesComponent';
import { Menu } from './components/Menu';
import { useContext } from 'react';
import { IsActiveMenuContext } from './context/IsActiveMenuContext';

export const App = () => {
  const { isActiveMenu } = useContext(IsActiveMenuContext);

  return (
    <div className="App">
      <Header />
      {isActiveMenu ? <Menu /> : <RoutesComponent />}
      <Footer />
    </div>
  );
};

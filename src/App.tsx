import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import './styles/styles.scss';

export const App = () => {
  // const { menuOpened } = useContext(ProductContext);

  return (
    <div className="App">
      <Header />
      {/*<div className="container">*/}
      <Outlet />
      {/*</div>*/}
      {<Footer />}
    </div>
  );
};

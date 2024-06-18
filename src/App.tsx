import './App.scss';
import { Outlet } from 'react-router-dom';
import { GridContainer } from './Components/GridContainer';
import { Provider } from './Store/Store';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

export const App = () => (
  <Provider>
    <div className="App">
      <Header />
      <GridContainer>
        <div className="Outlet">
          <Outlet />
        </div>
      </GridContainer>
      <Footer />
    </div>
  </Provider>
);

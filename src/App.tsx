import { Provider } from 'react-redux';
import './App.scss';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { store } from './utils/store';

export const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />

        <main className="main-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </Provider>
  );
};

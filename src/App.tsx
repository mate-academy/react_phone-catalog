import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './App.scss';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />

        <Outlet />

        <Footer />
      </div>
    </Provider>
  );
};

export default App;

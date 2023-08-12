import './App.scss';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />

        <main className="App__main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </Provider>
  );
};

export default App;

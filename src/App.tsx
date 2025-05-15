import { Provider } from 'react-redux';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { store } from './store/store';
import { HomePage } from './pages/HomePage/HomePage';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <HomePage />
      </BrowserRouter>
    </Provider>
  );
};

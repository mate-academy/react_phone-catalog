import { Provider } from 'react-redux';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { HomePage } from './pages/HomePage/HomePage';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  );
};

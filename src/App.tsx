import './styles/global.scss';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './routes/AppRouter';
import { ThemeProvider } from './app/providers/ThemeContext';
import { store } from './store/store';
export const App = () => (
  <div className="App">
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </HashRouter>
    </Provider>
  </div>
);

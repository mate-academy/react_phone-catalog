import './styles/app.scss';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import { App } from './App';
import { ThemeProvider } from './context/ThemeContext';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const Root = () => (
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark">
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
);

root.render(<Root />);

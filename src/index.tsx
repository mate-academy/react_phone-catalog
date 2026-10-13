import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { ShopProvider } from './context/ShopContext'; // <-- Импортируем провайдер
import './App.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Router>
      <ShopProvider>
        {' '}
        {/* <-- Оборачиваем App */}
        <App />
      </ShopProvider>
    </Router>,
  );
}

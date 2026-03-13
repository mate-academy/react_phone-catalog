import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { MyProvider } from './components/Contexts/Contexts';
import { AppProvider } from './components/Contexts/AppDataContext';
import { CategoryProvider } from './components/Contexts/CategoryContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <MyProvider>
      <AppProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </AppProvider>
    </MyProvider>
  </Router>,
);

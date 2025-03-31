import '@/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { HomePage } from '@/modules/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
// import Phones from '@/pages/Phones';
const App = () => {
  return (
    <BrowserRouter 
    basename='/react_phone-catalog/'
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/*<Route path="phones" element={<Phones />} />*/}
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

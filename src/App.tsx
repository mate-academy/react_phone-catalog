import '@/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { HomePage } from '@/modules/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Provider } from 'react-redux';
import { store } from '@/store'
// import Phones from '@/pages/Phones';
const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;

import '@/global.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { HomePage } from '@/modules/HomePage';
import { Phones } from '@/modules/Phones';
import { PhoneDetailsPage } from '@/components/PhoneDetailsPage';
import { NotFoundPage } from '@/components/NotFoundPage';
import { Provider } from 'react-redux';
import { store } from '@/store'
const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="phones" element={<Phones />} />
            <Route path="phones/:slug" element={<PhoneDetailsPage/>} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;

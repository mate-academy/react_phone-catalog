import React from 'react';
import { Provider } from 'react-redux';

// @ts-expect-error why this goes crazy
import 'swiper/css';
// @ts-expect-error why this goes crazy
import 'swiper/css/navigation';
// @ts-expect-error why this goes crazy
import 'swiper/css/pagination';

import './styles/index.scss';
import { store } from './store';
import { Router } from './Router';
import './i18n/i18n';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;

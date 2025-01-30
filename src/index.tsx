import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { store } from './app/store';

import { App } from './App';
// import { Home } from './components/modules/Home/Home';
// import { Tablets } from './components/modules/Tablets/Tablets';
// import { Phones } from './components/modules/Phones/Phones';
// import { Accessories } from './components/modules/Accessories/Accessories';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route index element={<Home />} />
          <Route path="tablets" element={<Tablets />} />
          <Route path="phones" element={<Phones />} />
          <Route path="accessories" element={<Accessories />} /> */}
          <Route path="*" element={<p>Page not found</p>}></Route>
        </Route>
      </Routes>
    </Router>
  </Provider>,
);

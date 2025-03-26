import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Header } from './modules/shared/Header';
import { HomePage } from './modules/HomePage/HomePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Header />} />
        {/* <Route path="phones" element={<HomePage/>}/>
        <Route path="tablets" element={<CartPage/>}/>
        <Route path="accessories" element={<Catalog/>}/> */}
      </Route>
    </Routes>
  </Router>
);

import { NavLink, Route, Routes } from 'react-router-dom';
import { ProductCard } from './modules/shared/components/ProductCard';
import './App.modules.scss';

export const App = () => {
  return (
    <>
      <div className="header">
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/phones'}>Phones</NavLink>
        <NavLink to={'/tablets'}>Tablets</NavLink>
        <NavLink to={'/accesories'}>Accesories</NavLink>
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<ProductCard />} />
          <Route path="phones" />
          <Route path="tablets" />
          <Route path="accesories" />
        </Routes>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="footer"></div>
    </>
  );
};

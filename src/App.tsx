import './App.scss';
import { Header } from './component/header/Header';
import { Bunner } from './component/banner/Bunner';
import { Products } from './component/Products/Products';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShopByCategory } from './component/ShopByCategory/ShopByCategory';
import { Category } from './component/Category/Category';
import { ProdutoEspecifico } from './component/ProdutoEspecifico/ProdutoEspecifico';
import { SavedProducts } from './component/savedProducts/savedProducts';
import { FooterRender } from './component/Footer/footer';
import { Favorite } from './component/favorite/favorite';
import { useParams } from 'react-router-dom';
export const App = () => {
  const CategoryRouter = () => {
    const { category } = useParams();

    if (
      category === 'phones' ||
      category === 'tablets' ||
      category === 'accessories'
    ) {
      return <Category />;
    }
  };

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <></>
        <Routes>
          <Route path="/:category" element={<CategoryRouter />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/productMain" element={<ProdutoEspecifico />}></Route>
          <Route
            path="/home"
            element={
              <>
                <Bunner />
                <Products page={'Hot Prices🔥'} />
                <ShopByCategory />
                <Products page={'Brand new models'} />
              </>
            }
          />
          <Route path="/cart" element={<SavedProducts />}></Route>
          <Route path="/favorities" element={<Favorite />}></Route>
        </Routes>
        <FooterRender />
      </HashRouter>
    </div>
  );
};

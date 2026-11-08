import './App.scss';

import { Header } from './component/header/Header';
import { Bunner } from './component/banner/Bunner';
import { Products } from './component/Products/Products';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';

import { ShopByCategory } from './component/ShopByCategory/ShopByCategory';
import { Category } from './component/Category/Category';
import { ProdutoEspec } from './component/ProdutoEspecifico/ProdutoEspecifico';
import { SavedProducts } from './component/savedProducts/savedProducts';
import { FooterRender } from './component/Footer/footer';
import { Favorite } from './component/favorite/favorite';
import { NotFound } from './component/NotFound/NotFound';

const CategoryRouter = (): JSX.Element => {
  const { category } = useParams();

  const categories = ['phones', 'tablets', 'accessories'];

  if (categories.includes(category || '')) {
    return <Category />;
  }

  return <NotFound notFound={'page'} />;
};

export const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

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

          <Route path="/productMain" element={<ProdutoEspec />} />

          <Route path="/cart" element={<SavedProducts />} />

          <Route path="/favorities" element={<Favorite />} />

          <Route path="/:category" element={<CategoryRouter />} />

          <Route path="*" element={<NotFound notFound="page" />} />
        </Routes>

        <FooterRender />
      </HashRouter>
    </div>
  );
};

import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";

import "./styles/index.scss";

import {store} from "./app/store";

import {App} from "./App";
import {Home} from "./components/pages/Home/Home";
import {Cart} from "./components/pages/Cart/Cart";
import {Favorite} from "./components/pages/Favorite/Favorite";
import {ProductsPage} from "./components/pages/ProductsPage/ProductsPage";
import {ProductDetails} from "./components/pages/ProductDetails/ProductDetails";

export const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/phones" element={<ProductsPage />} />
            <Route path="/tablets" element={<ProductsPage />} />
            <Route path="/accessories" element={<ProductsPage />} />

            <Route path="/phones/:productId" element={<ProductDetails />} />
            <Route path="/tablets/:productId" element={<ProductDetails />} />
            <Route
              path="/accessories/:productId"
              element={<ProductDetails />}
            />

            <Route path="/cart" element={<Cart />} />
            <Route path="/fav" element={<Favorite />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

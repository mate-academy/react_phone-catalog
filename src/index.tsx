import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  // при HashRouter не работает пагинация, но без HashRouter в itemcard не работают иконки
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { App } from "./App";
import { HomePage } from "./pages/HomePage/HomePage";
import { PhonesPage } from "./pages/PhonesPage/PhonesPage";
import { Favourites } from "./pages/Favourites/Favourites";
import { persistor, store } from "./store";
import { Cart } from "./pages/Cart/Cart";
import { ItemCard } from "./pages/ItemCard/ItemCard";
import { TabletsPage } from "./pages/TabletsPage/TabletsPage";
import { AccessoriesPage } from "./pages/AccessoriesPage/Accessories";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="./" />} />
            <Route path="/Phones" element={<PhonesPage />} />
            <Route path="/Phones/:id" element={<ItemCard />} />
            <Route path="/Tablets" element={<TabletsPage />} />
            <Route path="/Accessories" element={<AccessoriesPage />} />
            <Route path="/Favorites" element={<Favourites />} />
            <Route path="/Cart" element={<Cart />} />
            <Route
              path="*"
              element={
                <>
                  <h1 className="title">404 Page not found.</h1>

                  <NavLink to="/">Back home</NavLink>
                </>
              }
            />
          </Route>
        </Routes>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
);

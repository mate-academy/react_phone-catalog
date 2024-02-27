import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../HomePage/HomePage';
import { PhonesPage } from '../PhonesPage';
import { TabletsPage } from '../TabletsPage';
import { AccessoriesPage } from '../AccessoriesPage';
import { FavoritesPage } from '../FavouritesPage';
import { CartPage } from '../CartPage';
import { NotFoundPage } from '../NotFoundPage';
import { PhoneDetailsPage } from '../PhoneDetailsPage';
import { TabletDetailsPage } from '../TabletDetailsPage';
import { AccessoryDetailsPage } from '../AccessoryDetailsPage';
import { StorageProvider } from '../../components/StorageContext';
import { NewParamsProps } from '../../types/NewParams';

type PagesProps = {
  addParam: (newParams: NewParamsProps) => void;
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const Pages: React.FC<PagesProps> = ({
  addParam,
  setCartLength,
  setFavLength,
}) => {
  return (
    <StorageProvider>
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage
              setFavLength={setFavLength}
              setCartLength={setCartLength}
            />
          )}
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/phones">
          <Route
            index
            element={(
              <PhonesPage
                addParam={addParam}
                setFavLength={setFavLength}
                setCartLength={setCartLength}
              />
            )}
          />
          <Route
            path=":phoneId"
            element={(
              <PhoneDetailsPage
                setFavLength={setFavLength}
                setCartLength={setCartLength}
              />
            )}
          />
        </Route>
        <Route path="/tablets">
          <Route
            index
            element={(
              <TabletsPage
                addParam={addParam}
                setFavLength={setFavLength}
                setCartLength={setCartLength}
              />
            )}
          />
          <Route
            path=":tabletId"
            element={(
              <TabletDetailsPage
                setFavLength={setFavLength}
                setCartLength={setCartLength}
              />
            )}
          />
        </Route>
        <Route path="/accessories">
          <Route
            index
            element={(
              <AccessoriesPage
                addParam={addParam}
                setFavLength={setFavLength}
                setCartLength={setCartLength}
              />
            )}
          />
          <Route
            path=":accessoryId"
            element={(
              <AccessoryDetailsPage
                setFavLength={setFavLength}
                setCartLength={setCartLength}
              />
            )}
          />
        </Route>
        <Route
          path="/favorites"
          element={(
            <>
              <FavoritesPage
                setFavLength={setFavLength}
                setCartLength={setCartLength}
              />
            </>
          )}
        />
        <Route
          path="/cart"
          element={(
            <>
              <CartPage setCartLength={setCartLength} />
            </>
          )}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </StorageProvider>
  );
};

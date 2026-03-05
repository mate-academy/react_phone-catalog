import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { RegisterPromo } from './components/RegisterPromo/RegisterPromo';
import ToasterWrapper from './components/ui/ToasterWrapper/ToasterWrapper.tsx';

const named = <T,>(
  loader: () => Promise<{ [K in keyof T]: T[K] }>,
  key: keyof T,
) =>
  lazy(() =>
    loader().then((m) => ({ default: m[key] as React.ComponentType })),
  );

const AudiobookPage = named(
  () => import('@/pages/AudiobookPage'),
  'AudiobookPage',
);
const CartPage = named(() => import('@/pages/CartPage'), 'CartPage');
const CatalogPage = named(() => import('@/pages/CatalogPage'), 'CatalogPage');
const CategoryPage = named(
  () => import('./pages/CategoryPage'),
  'CategoryPage',
);
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const ContactsPage = named(
  () => import('@/pages/ContactsPage'),
  'ContactsPage',
);
const FavouritesPage = named(
  () => import('@/pages/FavouritesPage'),
  'FavouritesPage',
);
const ItemCardPage = named(
  () => import('@/pages/ItemCardPage'),
  'ItemCardPage',
);
const KindlePage = named(() => import('@/pages/KindlePage'), 'KindlePage');
const LoginPage = named(() => import('./pages/LoginPage'), 'LoginPage');
const NotFoundPage = named(
  () => import('@/pages/NotFoundPage'),
  'NotFoundPage',
);
const OrdersPage = lazy(() => import('@/pages/OrderPage'));
const OrderSuccessPage = lazy(() => import('@/pages/OrderSuccessPage.tsx'));
const PaperPage = named(() => import('@/pages/PaperPage'), 'PaperPage');
const ProfilePage = named(() => import('@/pages/ProfilePage'), 'ProfilePage');
const RightsPage = named(() => import('@/pages/RightsPage'), 'RightsPage');
const SignUpPage = named(() => import('./pages/SignUpPage'), 'SignUpPage');

function App() {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state?.background;

  const hideLayout =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col relative">
        {!hideLayout && <Header />}
        <main className="flex-1 relative z-10 overflow-x-hidden">
          <RegisterPromo />
          <Suspense fallback={null}>
            <Routes location={background || location}>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/home"
                element={<Navigate to="/" />}
              />
              <Route
                path="/login"
                element={<LoginPage />}
              />
              <Route
                path="/signup"
                element={<SignUpPage />}
              />
              <Route
                path="/catalog"
                element={<CatalogPage />}
              />
              <Route
                path="/paper"
                element={<PaperPage />}
              />
              <Route
                path="/kindle"
                element={<KindlePage />}
              />
              <Route
                path="/audiobook"
                element={<AudiobookPage />}
              />
              <Route
                path="/category/:categoryName"
                element={<CategoryPage />}
              />
              <Route
                path="/favourites"
                element={<FavouritesPage />}
              />
              <Route
                path="/cart"
                element={<CartPage />}
              />
              <Route
                path="/checkout"
                element={<CheckoutPage />}
              />
              <Route
                path="/order-success/:orderId"
                element={<OrderSuccessPage />}
              />
              <Route
                path="/orders"
                element={<OrdersPage />}
              />
              <Route
                path="/contacts"
                element={<ContactsPage />}
              />
              <Route
                path="/rights"
                element={<RightsPage />}
              />
              <Route
                path="/item/:type/:bookSlug"
                element={<ItemCardPage />}
              />
              <Route
                path="/profile"
                element={<ProfilePage />}
              />
              <Route
                path="*"
                element={<NotFoundPage />}
              />
            </Routes>
          </Suspense>
        </main>
        {!hideLayout && <Footer />}
      </div>
      {background && (
        <Suspense fallback={null}>
          <Routes>
            <Route
              path="/profile"
              element={<ProfilePage />}
            />
          </Routes>
        </Suspense>
      )}
      <ToasterWrapper />
    </>
  );
}

export default App;

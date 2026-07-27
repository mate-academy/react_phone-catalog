import { Navbar } from './modules/shared/components/Navbar';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { Footer } from './modules/shared/components/Footer';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Contacts } from './modules/Contacts';
import { Rights } from './modules/Rights';
import { NotFoundPage } from './modules/NotFoundPage';
import { Cart } from './modules/Cart';
import { Favorites } from './modules/Favorites';
import { Phones } from './modules/Phones';
import { Tablets } from './modules/Tablets';
import { Accessories } from './modules/Accessories';
import { ShopStateProvider } from './modules/shared/hooks';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export const App = () => (
    <ShopStateProvider>
        <div className="App" id="top">
            <ScrollToTop />
            <Navbar />

            <main className="App__body">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/phones" element={<Phones />} />
                    <Route path="/tablets" element={<Tablets />} />
                    <Route path="/accessories" element={<Accessories />} />
                    <Route path="/github" element={<h1>GitHub</h1>} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/rights" element={<Rights />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    </ShopStateProvider>
);

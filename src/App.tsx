/* eslint-disable import/no-extraneous-dependencies */
import { Header } from './components/header/header';
import { Footer } from './components/header/footer';
import '../src/styles/main.scss';
import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

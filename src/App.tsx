/* eslint-disable import/no-extraneous-dependencies */
import { Header } from './components/header/header';
import { Footer } from './components/header/footer';
import '../src/styles/main.scss';
import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const App = () => {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <main>
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={500} classNames="slide">
            <Outlet />
          </CSSTransition>
        </TransitionGroup>
      </main>
      <Footer />
    </div>
  );
};

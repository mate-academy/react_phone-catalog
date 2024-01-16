/* eslint-disable max-len */
import { Outlet } from 'react-router-dom';
import './App.scss';
import { ProductsProvider } from './components/ProductsContext';
import { Navbar } from './components/navbar';

export const App = () => {
  return (
    <ProductsProvider>
      <Navbar />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <nav className="navbar navbar--footer">
            <a href="/">
              <img className="navbar__logo navbar__logo--footer" src="icons/logo.svg" alt="logo" />
            </a>

            <div className="navbar__links navbar__links--footer">
              <a href="https://github.com/" className="navbar-item">
                github
              </a>
              <a href="https://github.com/" className="navbar-item">
                contacts
              </a>
              <a href="https://github.com/" className="navbar-item">
                rights
              </a>
            </div>

            <div className="navbar__totop">
              <label
                className="navbar__totop-label"
                htmlFor="top"
              >
                Back to top
              </label>

              <button
                id="top"
                className="navbar__totop-button pageSection__button"
                onClick={() => {
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }}
                title="Go to top"
                type="button"
                aria-label="go top"
              >
                <svg className="pageSection__button-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.52858 10.4712C3.26823 10.2109 3.26823 9.78878 3.52858 9.52843L7.52858 5.52843C7.78892 5.26808 8.21103 5.26808 8.47138 5.52843L12.4714 9.52843C12.7317 9.78878 12.7317 10.2109 12.4714 10.4712C12.211 10.7316 11.7889 10.7316 11.5286 10.4712L7.99998 6.94265L4.47138 10.4712C4.21103 10.7316 3.78892 10.7316 3.52858 10.4712Z" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </ProductsProvider>
  );
};

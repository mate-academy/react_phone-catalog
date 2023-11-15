/* eslint-disable max-len */
import { Outlet, Link } from 'react-router-dom';
import { GridContainer } from './Components/GridContainer';
import { typographyStyle } from './CustomStyles/Typography';
import { StylishNavButton } from './Components/StylishNavButton';
import { ArrowButton } from './Components/ArrowButton';

function scrollToTop() {
  window.scrollTo(0, 0);
}

const App = () => {
  return (
    <>
      <GridContainer>
        <div className="col-span-full flex h-16 items-center border-b-[1px] border-Elements">
          <Link to="/" className="ml-6 mr-16">
            <img className="h-16 w-10" src="/Icons/Logo.svg" alt="" />
          </Link>

          <div className="flex w-full justify-between">
            <nav
              className={`flex items-center gap-16 ${typographyStyle.uppercase}`}
            >
              <StylishNavButton to="/">home</StylishNavButton>
              <StylishNavButton to="phones">Phones</StylishNavButton>
              <StylishNavButton to="tablets">tablets</StylishNavButton>
              <StylishNavButton to="accessories">accessories</StylishNavButton>
              <StylishNavButton to="404">404</StylishNavButton>
            </nav>

            <div className="flex justify-self-end">
              <StylishNavButton
                to="favourites"
                imgUrl="/Icons/Favourites.svg"
              />
              <StylishNavButton to="cart" imgUrl="/Icons/Cart.svg" />
            </div>
          </div>
        </div>

        <div className="col-span-12 col-start-2 grid auto-rows-min grid-cols-12 gap-x-4">
          <Outlet />
        </div>

        <div className="col-span-12 col-start-2 flex h-[96px] items-center justify-between text-Secondary">
          <Link to="/" className="flex h-full items-center">
            <img className="h-full w-10" src="/Icons/Logo.svg" alt="" />
          </Link>

          <nav
            className={`flex h-full items-center gap-x-16 ${typographyStyle.uppercase}`}
          >
            <a className="flex h-[96px] items-center" href="#github">
              github
            </a>
            <a className="flex h-[96px] items-center" href="#contacts">
              contacts
            </a>
            <a className="flex h-[96px] items-center" href="#rights">
              rights
            </a>
          </nav>

          <div className="flex h-full items-center gap-x-4 font-Mont text-[12px] font-semibold hover:cursor-pointer">
            <label className="hover:cursor-pointer" htmlFor="to-top">
              Back to top:
            </label>
            <ArrowButton id="to-top" direction="up" onClick={scrollToTop} />
          </div>
        </div>
      </GridContainer>
    </>
  );
};

export default App;

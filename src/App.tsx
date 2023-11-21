/* eslint-disable max-len */
import { useContext } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { GridContainer } from './Components/GridContainer';
import { typographyStyle } from './CustomStyles/Typography';
import { StylishNavButton } from './Components/StylishNavButton';
import { ArrowButton } from './Components/ArrowButton';
import { scrollToTop } from './utils/scrollToTop';
import { appContext } from './Contexts/AppContext';

const App = () => {
  const {
    favorites,
    cartItems,
    searchParams,
    setSearchParams,
  } = useContext(appContext);
  const { catalogueId, itemId } = useParams();
  const searchQuery = searchParams.get('query') || '';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(params => {
      params.set('query', event.target.value);

      return params;
    });
  };

  const getTotalCartItem = () => {
    return cartItems.reduce((prev, acc) => prev + acc.quantity, 0);
  };

  return (
    <>
      <GridContainer>
        <div className="relative z-20 col-span-full flex h-16 items-center border-b-[1px] border-Elements bg-white">
          <Link to="/" className="ml-6 mr-16">
            <img className="h-16 w-10" src="./Icons/Logo.svg" alt="" />
          </Link>

          <div className="flex w-full justify-between">
            <nav
              className={`flex items-center gap-16 ${typographyStyle.uppercase}`}
            >
              <StylishNavButton to="/">home</StylishNavButton>

              <StylishNavButton to="catalogue/phones">phones</StylishNavButton>

              <StylishNavButton to="catalogue/tablets">
                tablets
              </StylishNavButton>

              <StylishNavButton to="catalogue/accessories">
                accessories
              </StylishNavButton>
            </nav>

            <div className="flex justify-self-end">
              {catalogueId && !itemId && (
                <div className="flex h-full w-80 items-center border border-r-0 border-Elements px-6 ">
                  <input
                    value={searchQuery}
                    onChange={handleInputChange}
                    className={`h-full w-80 outline-none ${typographyStyle.button}`}
                    placeholder={`Search in ${catalogueId}...`}
                    type="text"
                  />
                  <img className="h-4 w-4" src="./Icons/Search.svg" alt="" />
                </div>
              )}

              <StylishNavButton
                counter={favorites.length}
                to="favourites"
                imgUrl="./Icons/Favourites.svg"
              />

              <StylishNavButton
                counter={getTotalCartItem()}
                to="cart"
                imgUrl="./Icons/Cart.svg"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 col-start-2 grid auto-rows-min grid-cols-12 gap-x-4">
          <Outlet />
        </div>

        <div className="col-span-12 col-start-2 flex h-[96px] items-center justify-between text-Secondary">
          <Link to="/" className="flex h-full items-center">
            <img className="h-full w-10" src="./Icons/Logo.svg" alt="" />
          </Link>

          <nav
            className={`flex h-full items-center gap-x-16 ${typographyStyle.uppercase}`}
          >
            <a className="flex h-[96px] items-center" href="https://github.com/donizer/react_phone-catalog/">
              github
            </a>
            <a className="flex h-[96px] items-center" href="#contacts">
              contacts
            </a>
            <a className="flex h-[96px] items-center" href="#rights">
              rights
            </a>
          </nav>

          <div className="flex h-full items-center gap-x-4 font-Mont text-[12px] font-semibold">
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

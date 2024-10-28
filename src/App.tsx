// import './App.scss';

// export const App = () => (
//   <div className="App">
//     <h1>Product Catalog</h1>
//   </div>
// );

// import './App.scss';
// import styles from '../src/styles/layout.module.scss';
// import logo from '../public/img/logo/Logo.svg';
// import favouritesIcon from '../public/img/icons/Favourites.svg';
// import shoppingBagIcon from '../public/img/icons/ShoppingBag.svg';
// // import { logo, favouritesIcon, shoppingBagIcon } from './assets/icons';
// // import { strokeLeft, strokeRight } from './assets/icons';
// import banner from '../public/img/banner/Banner.svg';
// import strokeLeft from '../public/img/icons/StrokeLeft.svg';
// import strokeRight from '../public/img/icons/StrokeRight.svg';
// import iPhone from '../public/img/iPhones/iphone-first.svg';
// import iPhoneSecond from '../public/img/iPhones/iphone-two.svg';
// import iPhoneThird from '../public/img/iPhones/iphone-three.svg';
// import iPhoneFourth from '../public/img/iPhones/iphone-fhour.svg';
// // import { iPhone, iPhoneSecond, iPhoneThird, iPhoneFourth } from './assets/image';
// import categoryFirst from '../public/img/Category/categoryFirst.svg';
// import categorySecond from '../public/img/Category/categorySecond.svg';
// import categoryThird from '../public/img/Category/categoryThird.svg';
// import hotPriceFirst from '../public/img/hotPrice/iPhone1.svg';
// import hotPriceSecond from '../public/img/hotPrice/iPhone2.svg';
// import hotPriceThird from '../public/img/hotPrice/iPhone3.svg';
// import hotPriceFourth from '../public/img/hotPrice/iPhone4.svg';
// import arrowUp from '../public/img/icons/ArrowUp.svg';

// export const App: React.FC = () => {
//   return (
//     <div className={styles.container}>

//       <header id="top" className="header">
//         <div className='header__logo'>
//           <a href="/" className='header__logo-link'>
//             <img src={logo} alt="Logo" className='header__logo-logo' />
//           </a>
//           <nav>
//             <ul className='header__nav-list'>
//               <li>
//                 <a href="/" className='header__nav-link active'>HOME</a>
//               </li>
//               <li>
//                 <a href="/phones" className='header__nav-link'>PHONES</a>
//               </li>
//               <li>
//                 <a href="/tablets" className='header__nav-link'>TABLETS</a>
//               </li>
//               <li>
//                 <a href="/accessories" className='header__nav-link'>ACCESSORIES</a>
//               </li>
//             </ul>
//           </nav>
//         </div>

//         <div className='header__icons'>
//           <a href="/favourites" className="header__icon header__icon--favourites">
//             <img src={favouritesIcon} alt="Favourites" />
//           </a>
//           <a href="/shopping-bag" className="header__icon header__icon--bag">
//             <img src={shoppingBagIcon} alt="Shopping Bag" />
//           </a>
//         </div>
//       </header>

//       <main className='main'>
//         <h1 className='main__title'>Welcome to Nice Gadgets store!</h1>

//         <section className='section'>
//           <img src={banner} alt="Banner" className='section__image' />
//           <div className='section__icons'>
//             <a href="#"><img src={strokeLeft} alt="Previous" className='section__icon section__icon--left'/></a>
//             <a href="#"><img src={strokeRight} alt="Next" className='section__icon section__icon--right'></img></a>
//           </div>
//           <div className="slider-indicators">
//             <span className="slider-indicator active"></span>
//             <span className="slider-indicator"></span>
//             <span className="slider-indicator"></span>
//           </div>
//         </section>

//         <section className='section section--brand-new'>
//           <h2 className='section__title'>Brand new models</h2>
//           <div className='product-grid'>
//             <div className='product-card'>
//               <img src={iPhone} alt="iPhone" className='product-card__image' />
//               <h3 className='product-card__title'>Apple iPhone 14 Pro 128GB Silver (MQ023)</h3>
//               <p className='product-card__price'>$999</p>
//               <div className='product-card__specs'>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Screen</span>
//                   <span className='product-card__value'>6.1”OLED</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Capacity</span>
//                   <span className='product-card__value'>128 GB</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>RAM</span>
//                   <span className='product-card__value'>6 GB</span>
//                 </div>
//               </div>
//               <div className='product-card__actions'>
//                 <button className='product-card__button'>Add to cart</button>
//                   <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
//               </div>
//             </div>

//             <div className='product-card'>
//               <img src={iPhoneSecond} alt="iPhone" className='product-card__image' />
//               <h3 className='product-card__title'>Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)</h3>
//               <p className='product-card__price'>$999</p>
//               <div className='product-card__specs'>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Screen:</span>
//                   <span className='product-card__value'>6.1”OLED</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Capacity</span>
//                   <span className='product-card__value'>128 GB</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>RAM</span>
//                   <span className='product-card__value'>6 GB</span>
//                 </div>
//               </div>
//               <div className='product-card__actions'>
//                 <button className='product-card__button'>Add to cart</button>
//                   <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
//               </div>
//             </div>
//             <div className='product-card'>
//               <img src={iPhoneThird} alt="iPhone" className='product-card__image' />
//               <h3 className='product-card__title'>Apple iPhone 14 Plus 128GB PRODUCT GOLD (MQ513)</h3>
//               <p className='product-card__price'>$999</p>
//               <div className='product-card__specs'>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Screen:</span>
//                   <span className='product-card__value'>6.7”OLED</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Capacity:</span>
//                   <span className='product-card__value'>128 GB</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>RAM:</span>
//                   <span className='product-card__value'>6 GB</span>
//                 </div>
//               </div>
//               <div className='product-card__actions'>
//                 <button className='product-card__button'>Add to cart</button>
//                   <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
//               </div>
//             </div>
//             <div className='product-card'>
//               <img src={iPhoneFourth} alt="iPhone" className='product-card__image' />
//               <h3 className='product-card__title'>Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)</h3>
//               <p className='product-card__price'>$859</p>
//               <div className='product-card__specs'>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Screen:</span>
//                   <span className='product-card__value'>6.7”OLED</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Capacity:</span>
//                   <span className='product-card__value'>128 GB</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>RAM:</span>
//                   <span className='product-card__value'>6 GB</span>
//                 </div>
//               </div>
//               <div className='product-card__actions'>
//                 <button className='product-card__button'>Add to cart</button>
//                   <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className='section'>
//           <h2 className='section__title'>Shop by category</h2>
//           <div className='categories'>
//             <div className='category category--mobiles'>
//               <img src={categoryFirst} alt="Phones" className='category__image' />
//               <h3 className='category__title'>Mobile phones</h3>
//               <p className='category__count'>95 models</p>
//             </div>
//             <div className='category category--tablets'>
//               <img src={categorySecond} alt="Tablets" className='category__image' />
//               <h1 className='category__title'>Tablets</h1>
//               <p className='category__count'>95 models</p>
//             </div>
//             <div className='category category--accessories'>
//               <img src={categoryThird} alt="Accessories" className='category__image' />
//               <h1 className='category__title'>Accessories</h1>
//               <p className='category__count'>95 models</p>
//             </div>
//           </div>
//         </section>

//         <section className='section section--hot-prices'>
//           <div className='section__header'>
//             <h1 className='section__title'>Hot prices</h1>
//             <a href="#"><img src={strokeLeft} alt="Previous" ></img></a>
//             <a href="#"><img src={strokeRight} alt="Next"></img></a>
//           </div>

//           <div className='product-grid'>
//             <div className='product-card'>
//               <img src={hotPriceFirst} alt="" className='product-card__image' />
//               <p className='product-card__title'>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
//               <div className='product-card__price'>
//                 <p className='product-card__price-value product-card__price-value--new'>$799</p>
//                 <p className='product-card__price-value product-card__price-value--old'>$999</p>
//               </div>
//               <div className='product-card__specs'>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Screen</span>
//                   <span className='product-card__value'>6.1”OLED</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Capacity</span>
//                   <span className='product-card__value'>64 GB</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>RAM</span>
//                   <span className='product-card__value'>4 GB</span>
//                 </div>
//               </div>
//               <div className='product-card__actions'>
//                 <button className='product-card__button'>Add to cart</button>
//                   <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
//               </div>
//             </div>

//             <div className='product-card'>
//               <img src={hotPriceSecond} alt="" className='product-card__image' />
//               <p className='product-card__title'>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
//               <div className='product-card__price'>
//                 <p className='product-card__price-value product-card__price-value--new'>$799</p>
//                 <p className='product-card__price-value product-card__price-value--old'>$999</p>
//               </div>
//               <div className='product-card__specs'>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Screen</span>
//                   <span className='product-card__value'>6.5”OLED</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Capacity</span>
//                   <span className='product-card__value'>64 GB</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>RAM</span>
//                   <span className='product-card__value'>4 GB</span>
//                 </div>
//               </div>
//               <div className='product-card__actions'>
//                 <button className='product-card__button'>Add to cart</button>
//                   <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
//               </div>
//             </div>

//             <div className='product-card'>
//               <img src={hotPriceThird} alt="" className='product-card__image' />
//               <p className='product-card__title'>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
//               <div className='product-card__price'>
//                 <p className='product-card__price-value product-card__price-value--new'>$799</p>
//                 <p className='product-card__price-value product-card__price-value--old'>$999</p>
//               </div>
//               <div className='product-card__specs'>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Screen</span>
//                   <span className='product-card__value'>6.5”OLED</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Capacity</span>
//                   <span className='product-card__value'>64 GB</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>RAM</span>
//                   <span className='product-card__value'>4 GB</span>
//                 </div>
//               </div>
//               <div className='product-card__actions'>
//                 <button className='product-card__button'>Add to cart</button>
//                   <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
//               </div>
//             </div>

//             <div className='product-card'>
//               <img src={hotPriceFourth} alt="" className='product-card__image' />
//               <p className='product-card__title'>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
//               <div className='product-card__price'>
//                 <p className='product-card__price-value product-card__price-value--new'>$799</p>
//                 <p className='product-card__price-value product-card__price-value--old'>$999</p>
//               </div>
//               <div className='product-card__specs'>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Screen</span>
//                   <span className='product-card__value'>6.5”OLED</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>Capacity</span>
//                   <span className='product-card__value'>64 GB</span>
//                 </div>
//                 <div className='product-card__details'>
//                   <span className='product-card__property'>RAM</span>
//                   <span className='product-card__value'>4 GB</span>
//                 </div>
//               </div>
//               <div className='product-card__actions'>
//                 <button className='product-card__button'>Add to cart</button>
//                   <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className='footer'>
//         <div className='footer__container'>
//           <a href="/" className='footer__logo'>
//             <img src={logo} alt="Logo" />
//           </a>

//           <nav className='footer__nav'>
//             <ul className='footer__nav-list'>
//               <li>
//                 <a href="https://github.com" className='footer__nav-link'>GITHUB</a>
//               </li>
//               <li>
//                 <a href="/contacts" className='footer__nav-link'>CONTACTS</a>
//               </li>
//               <li>
//                 <a href="/rights" className='footer__nav-link'>RIGHTS</a>
//               </li>
//             </ul>
//           </nav>

//           <div className='footer__elements'>
//           <p className='footer__text'>Back to top</p>
//           <a href="#top"><img src={arrowUp} alt="Arrow up" className='footer__image'/></a>
//           </div>
//         </div>

//       </footer>
//     </div>
//   );
// };

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import './App.scss';
import styles from '../src/styles/layout.module.scss';
import { useRef } from 'react';
import PhonesPage from './modules/PhonesPage/PhonesPage';
import ProductsPage from './modules/ProductsPage/ProductsPage';
import AccessoriesPage from './modules/AccessoriesPage/AccessoriesPage';
import TabletsPage from './modules/TabletsPage/TabletsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

export const App: React.FC = () => {
  const topRef = useRef<HTMLDivElement | null>(null);

  return (
    <Router>
      <div className={styles.container}>
        <Header ref={topRef} />
        <main className="main">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/product/:itemId" element={<ProductDetailsPage />} />
            <Route path="/favourites" element={<div>Favourites Page</div>} />
            <Route
              path="/shopping-bag"
              element={<div>Shopping Bag Page</div>}
            />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </main>
        <Footer topRef={topRef} />
      </div>
    </Router>
  );
};

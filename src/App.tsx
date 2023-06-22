import './App.scss';
import  { useState } from 'react';
import classNames from 'classnames';

import banners from './api/banner.json';

const App = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="page">
    <header className="header">
      <div className="header__content">
        <a href="/" className='header__logo'></a>

        <nav className='navigation'>
          <ul className='navigation__list'>
            <li className='navigation__item'><a href="/home" className='navigation__link active'>home</a></li>
            <li className='navigation__item'><a href="/phones" className='navigation__link'>Phones</a></li>
            <li className='navigation__item'><a href="/tablets" className='navigation__link'>tablets</a></li>
            <li className='navigation__item'><a href="/accessories" className='navigation__link'>accessories</a></li>
          </ul>
        </nav>
      </div>
      <div className="header__buy">
        <div className="header__search">
          <input className='field__search--input' name="" id="" placeholder='Search in favourites...'/>

          <button className='field__search--btn close'></button>
        </div>
        
        <div className="header__btn header__btn--like">
          {/* <span className='count'>0</span> */}
        </div>
        <div className="header__btn header__btn--cart">
          {/* <span className='count'>0</span> */}
        </div>
        <div 
          className={classNames(
            'header__btn',
            'header__btn--menu',
            {active: menu}
          )}
          onClick={() => setMenu(!menu)}
        >
        </div>
      </div>
    </header>

    <nav
      className={classNames('navigation--mobiel', {active: menu})} 
      id='menu'
    >
      <ul className='navigation--mobiel__list'>
        <li className='navigation--mobiel__item'><a href="/home" className='navigation--mobiel__link'>home</a></li>
        <li className='navigation--mobiel__item'><a href="/phones" className='navigation--mobiel__link'>Phones</a></li>
        <li className='navigation--mobiel__item'><a href="/tablets" className='navigation--mobiel__link'>tablets</a></li>
        <li className='navigation--mobiel__item'><a href="/accessories" className='navigation--mobiel__link'>accessories</a></li>
        <li className='navigation--mobiel__item'><a href="/phones" className='navigation--mobiel__link'>Github</a></li>
        <li className='navigation--mobiel__item'><a href="/tablets" className='navigation--mobiel__link'>Contacts</a></li>
        <li className='navigation--mobiel__item'><a href="/accessories" className='navigation--mobiel__link'>rights</a></li>
      </ul>
    </nav>

    <main className='main'>
      <div className="container">
        <section className='slider main__section'>
          <button className='slider__btn'></button>
          <div className="slider__block-img">
            {banners.map(b => (
              <img src={b.img}  key={b.img} alt="" />
            ))}
          </div>
          <button className='slider__btn'></button>
        </section>
        <section className='hot-price main__section'>
          <div className="hot-price__content">
            <div className='hot-price__head'>
              <h1 className="main__section--title">Hot prices</h1>

              <div className='hot-price__block-btn'>
                <button className='hot-price__btn'></button>
                <button className='hot-price__btn'></button>
              </div>
            </div>

            <div className='hot-price__block'>
              <ul className='hot-price__list'>
                <li className='hot-price__item'>
                  <div className="card">
                    <div className="card__container">
                      <div className="card__head">
                        <img src="" alt="" />
                        <p>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
                        <div className='card__price'>1000<span className='card__sale'>1100</span></div>
                      </div>
                      
                      <div className="card__info">
                        <div>
                          <span></span>
                          <span></span>
                        </div>
                        <div>
                          <span></span>
                          <span></span>
                        </div>
                        <div>
                          <span></span>
                          <span></span>
                        </div>
                      </div>

                      <div className="card__footer">
                        <button className="card__btn--buy">Add to cart</button>
                        <button className="card__btn--like"></button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* <section className='hot-price main__section'></section> */}
        {/* <section className='hot-price main__section'></section> */}
      </div>
    </main>
  </div>
  )
}

export default App;

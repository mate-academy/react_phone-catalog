import React from 'react';

const HomePage = () => (
  <main className="home-page">
    <h1 className="home-page__title">Welcome to our Phones shop!</h1>

    <div className="home-page__content">
      <div className="home-page__contacts">
        <h2>Our contacts:</h2>

        <div>
          <h3>Phones:</h3>
          <ul className="home-page__contacts-list">
            <li>(057) 000 00 00</li>
            <li>(099) 000 00 00</li>
            <li>(068) 000 00 00</li>
            <li>(073) 000 00 00</li>
          </ul>
        </div>

        <div>
          <h3>E-mails:</h3>
          <a
            href="/"
            className="home-page__contacts-email"
          >
            12345@example.com
          </a>
        </div>

        <div>
          <h3>We in social networks:</h3>
          <ul className="home-page__contacts-list home-page__social-networks">
            <li>
              <a href="https://www.facebook.com/">
                <img
                  src="img/facebook-logo.png"
                  alt="link to facebook page"
                  className="home-page__social-networks-logo"
                />
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com/">
                <img
                  src="img/instagram-logo.png"
                  alt="link to instagram page"
                  className="home-page__social-networks-logo"
                />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3>We are located:</h3>
          <p className="home-page__contacts-adress">
            Sumska St, 1, Kharkiv, Ukraine
          </p>
        </div>
      </div>

      <div className="home-page__map-wrapper">
        <h2 className="home-page__map-wrapper-title">Our location on map:</h2>

        <iframe
          title="Google map"
          className="home-page__map"
          src="https://maps.google.com/maps?width=&amp;height=&amp;hl=en&amp;q=Kharkiv%2C%20Ukraine%2C%20Sumska%20st.%2C%201+(Phone%20Shop)&amp;ie=UTF8&amp;t=&amp;z=9&amp;iwloc=B&amp;output=embed"
          frameBorder="0"
          scrolling="no"
        />
      </div>
    </div>
  </main>
);

export default HomePage;

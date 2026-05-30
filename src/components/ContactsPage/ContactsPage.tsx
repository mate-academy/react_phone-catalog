import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './ContactsPage.scss';

export const ContactsPage: React.FC = () => {
  return (
    <div className="contacts-page">
      <Header />

      <main className="contacts-page__main">
        <div className="container">
          <h1 className="contacts-page__title">Contacts</h1>

          <div className="contacts-page__content">
            <div className="contacts-page__section">
              <h2 className="contacts-page__section-title">Our Store</h2>
              <div className="contacts-page__info">
                <p className="contacts-page__text">
                  <strong>Address:</strong> 123 Gadget Street, Tech City, TC
                  12345
                </p>

                <p className="contacts-page__text">
                  <strong>Working Hours:</strong> Monday - Friday: 9:00 AM -
                  8:00 PM
                </p>
                <p className="contacts-page__text">
                  Saturday - Sunday: 10:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="contacts-page__section">
              <h2 className="contacts-page__section-title">Contact Us</h2>
              <div className="contacts-page__info">
                <p className="contacts-page__text">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p className="contacts-page__text">
                  <strong>Email:</strong> support@nicegadgets.com
                </p>
              </div>
            </div>

            <div className="contacts-page__section">
              <h2 className="contacts-page__section-title">
                Send Us a Message
              </h2>
              <form className="contacts-page__form">
                <div className="contacts-page__form-group">
                  <label htmlFor="name" className="contacts-page__label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="contacts-page__input"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="contacts-page__form-group">
                  <label htmlFor="email" className="contacts-page__label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="contacts-page__input"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="contacts-page__form-group">
                  <label htmlFor="message" className="contacts-page__label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="contacts-page__textarea"
                    placeholder="Enter your message"
                    rows={5}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contacts-page__button">
                  Send Message
                </button>
              </form>
            </div>

            <div className="contacts-page__section">
              <h2 className="contacts-page__section-title">Find Us</h2>
              <div className="contacts-page__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567
                  !2d-73.9876543!3d40.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1
                  !3m3!1m2!1s0x0%3A0x0!2zNDDCsDA3JzI0LjQiTiA3M8KwNTknMTUuNiJX!5e0"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Store Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

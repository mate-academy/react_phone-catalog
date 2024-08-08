/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import './ContactsPage.scss';

export const ContactsPage = () => {
  return (
    <div className="contact">
      <div className="contact__content">
        <h1 className="contact__title">Contact Us</h1>
        <section className="contact__info">
          <div>
            <h2>Our Contact Information</h2>
            <p>
              Email:{' '}
              <Link to="mailto:contact@example.com">contact@example.com</Link>
            </p>
            <p>
              Phone: <Link to="tel:(123) 456-7890">(123) 456-7890</Link>
            </p>
            <p>
              Address:{' '}
              <Link
                to="https://www.google.com/maps/search/?api=1&query=123+Example+Street,+City,+Country"
                target="_blank"
                rel="noopener noreferrer"
              >
                123 Example Street, City, Country
              </Link>
            </p>
          </div>
        </section>
        <section className="contact__form">
          <div>
            <h2>Send Us a Message</h2>
            <form>
              <div className="contact__form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="contact__form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="contact__form-group">
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

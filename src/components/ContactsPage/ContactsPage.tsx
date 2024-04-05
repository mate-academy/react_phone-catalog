import React from 'react';

export const ContactsPage: React.FC = () => {
  return (
    <div className="contacts">
      <h3 className="contacts__title">Contact Us</h3>
      <p className="contacts__text">Feel free to get in touch with us.</p>
      <ul className="contacts__list">
        <li className="contacts__item">
          {`Email: `}
          <a href="mailto:info@example.com" className="contacts__link">
            info@example.com
          </a>
        </li>
        <li className="contacts__item">
          {`Phone: `}
          <a href="tel:+123456789" className="contacts__link">
            +1 234 567 89
          </a>
        </li>
        <li className="contacts__item">
          Address: 123 Main Street, City, Country
        </li>
      </ul>
    </div>
  );
};

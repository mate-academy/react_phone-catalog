/* eslint-disable max-len */
import React from 'react';
import '../../styles/style.scss';

export const ContactsPage = () => {
  return (
    <div className="page">
      <h1 className="contacts__title text-h1">Contacts</h1>
      <div className="contacts__tel text-h3">Phone</div>
      <a className="contacts__text" href="tel:+380 800 509 382">
        +380 800 509 382
      </a>
      <div className="contacts__email text-h3">Email</div>
      <a
        className="contacts__text"
        href="mailto:support.apple.com/uk-ua/contact"
      >
        support.apple.com/uk-ua/contact
      </a>
      <div className="contacts__adress text-h3">Contacts</div>
      <a
        className="contacts__text"
        href="https://www.google.com/maps/search/Willow+Park+Bears+Apple+Valley+California"
        target="_blank"
        rel="noopener noreferrer"
      >
        Willow Park Bears Apple Valley California
      </a>
    </div>
  );
};

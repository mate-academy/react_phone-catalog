import React from 'react';
import Contact from './Contact/Contact';
import { yaroslav, andrii } from '../../helpers/contactsInfo';
import './Contacts.scss';

const Contacts = () => {
  return (
    <div className="contacts">
      <Contact
        contactInfo={yaroslav}
      />
      <div className="contacts__divide-line"></div>
      <Contact
        contactInfo={andrii}
      />
    </div>
  );
};

export default Contacts;

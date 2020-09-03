import React from 'react';
import './Contact.scss';

type Props = {
  contactInfo: Contact;
};

const Contact: React.FC<Props> = ({ contactInfo }) => {
  const { photo, name, skype, linkedIn, email, phone } = contactInfo;
  const skypeIcon = "./img/icons/Contacts/skype.svg";
  const linkedInIcon = "./img/icons/Contacts/linkedin.svg";
  const emailIcon = "./img/icons/Contacts/email.svg";
  const phoneIcon = "./img/icons/Contacts/iphone.svg";

  return (
    <div className="contact">
      <div className="contact__information-wrapper">
        <img
          className="contact__photo contact__img"
          src={photo}
          alt="contact"
        />
        <h1 className="contact__name">
          {name}
        </h1>
      </div>
      <div className="contact__information-wrapper contact__information">
        <img
          className="contact__icon contact__img"
          src={skypeIcon}
          alt="skype"
        />
        <p className="contact__text">
          {skype}
        </p>
      </div>
      <div className="contact__information-wrapper contact__information">
        <img
          className="contact__icon contact__img"
          src={linkedInIcon}
          alt="linkedIn"
        />
        <a
          href={linkedIn}
          rel="noopener noreferrer"
          target="_blank"
          className="contact__text contact__link"
        >
          {name}
        </a>
      </div>
      <div className="contact__information-wrapper contact__information">
        <img
          className="contact__icon contact__img"
          src={emailIcon}
          alt="email"
        />
        <a
          href={`mailto:${email}`}
          className="contact__text contact__link"
        >
          {email}
        </a>
      </div>
      <div className="contact__information-wrapper contact__information">
        <img
          className="contact__icon contact__img"
          src={phoneIcon}
          alt="phone"
        />
        <a
          href={`tel:${phone}`}
          className="contact__text contact__link"
        >
          {`+${phone}`}
        </a>
      </div>
    </div>
  );
};

export default Contact;

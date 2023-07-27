/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import './Contacts.scss';
import HomeImage from './ContactsImage/Home.svg';
import Arrowimage from './ContactsImage/Arrow.svg';
import facebook from './ContactsImage/facebook.svg';
import github from './ContactsImage/github.svg';
import gmail from './ContactsImage/gmail.svg';
import Linkdn from './ContactsImage/Linkdn.svg';
import phone from './ContactsImage/phone.svg';
import telegram from './ContactsImage/telegram.svg';
import instagram from './ContactsImage/instagram.svg';

const contactData = [
  {
    image: facebook,
    text: 'Nazar Medushevskyi',
    linkImage:
      'https://www.facebook.com/friends',
  },
  {
    image: github,
    text: 'Nazar Medushevskyi',
    linkImage: 'https://github.com/nazar-medushevskyi',
  },
  {
    image: gmail,
    text: 'nazar378378379379@gmail.com',
    linkImage: 'mailto:nazar378378379379@gmail.com',
  },
  {
    image: Linkdn,
    text: 'Nazar Medushevskyi',
    linkImage: 'https://www.linkedin.com/feed/',
  },
  {
    image: phone,
    text: '+380 999 580 209',
    linkImage: 'tel:+380999580209',
  },
  {
    image: telegram,
    text: 'MedushevskiyN',
    linkImage: 'https://t.me/MedushevskiyN',
  },
  {
    image: instagram,
    text: 'nazar.medushevskiy',
    linkImage: 'https://www.instagram.com/nazar.medushevskiy/',
  },
];

export const ContactsPage = () => {
  return (
    <>
      <div className="block-for-svg">
        <Link to="/">
          <div className="block-for-svg-home">
            <img className="icon" src={HomeImage} alt="HomeImage" />
          </div>
        </Link>

        <div className="block-for-svg-home-arrow">
          <img className="icon" src={Arrowimage} alt="Arrowimage" />
        </div>

        <p className="block-forPageNotFound__text-1">Contacts</p>
      </div>

      <div className="allBlockContct">

        <div className="BlockForContacts">
          <h1 className="title-forHotPrice">Contacts</h1>

          {contactData.map((contact, index) => (
            <div className="BlockForContacts-info" key={index}>
              <a href={contact.linkImage}>
                <img
                  className="BlockForContacts-info-image"
                  src={contact.image}
                  alt=""
                />
              </a>

              <a
                className="BlockForContacts-info-text-item"
                href={contact.linkImage}
              >
                <p className="BlockForContacts-info-text">{contact.text}</p>
              </a>
            </div>
          ))}
        </div>

        <div className="containerForAnimationContacts">
          <div className="container-for-bear">
            <div className="bear">
              <div className="bear__ears">
                <div className="bear__ears__left ear" />
                <div className="bear__ears__right ear" />
              </div>
              <div className="bear__body">
                <div className="bear__eyes">
                  <div className="bear__eyes--left eye" />
                  <div className="bear__eyes--right eye" />
                </div>
                <div className="bear__nose">
                  <div className="bear__nose--inner" />
                </div>
              </div>
            </div>
            <div className="shadow" />
          </div>
        </div>
      </div>

    </>
  );
};

import './ContactsPage.scss';

import telegram from '../../images/Icons/Tilda_Icons_26snw_telegram.svg';
import gmail from '../../images/Icons/Tilda_Icons_26snw_mail13.svg';
import phone from '../../images/Icons/Tilda_Icons_26snw_whatsapp.svg';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

const contactsData = [
  {
    image: gmail,
    text: 'makstsar94@gmail.com',
    linkImage: 'mailto:makstsar94@gmail.com',
  },
  {
    image: phone,
    text: '+380 938 167 107',
    linkImage: 'tel:+380938167107',
  },
  {
    image: telegram,
    text: 'Maksym Tsarenko',
    linkImage: 'https://t.me/No5Name',
  },
];

export const ContactsPage = () => {
  return (
    <section className="contacts">
      <div className="contacts__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="contacts__content">
        <h1 className="title">
          Contacts
        </h1>

        {contactsData.map(contact => (
          <div
            key={contact.text}
            className="contacts__info"
          >
            <a
              className="contacts__link"
              href={contact.linkImage}
            >
              <img src={contact.image} alt={contact.text} />

              <p className="contacts__info-text">{contact.text}</p>
            </a>

          </div>
        ))}
      </div>
    </section>
  );
};

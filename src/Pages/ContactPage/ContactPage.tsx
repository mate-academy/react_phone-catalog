import { Link } from 'react-router-dom';
import './ContactPage.scss';
import { contacts } from '../../Helpers/Variables';

export const ContactPage = () => {
  return (
    <section className="contact">
      <div className="contact__wrapper">
        {contacts.map((contact) => (
          <Link
            key={contact.id}
            to={contact.url}
            target="_blank"
            className="contact__link"
          >
            <img
              src={contact.img}
              alt="contact"
              className="contact__img"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

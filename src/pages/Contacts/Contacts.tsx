/* eslint-disable max-len */
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

const BREADCRUBS_DATA = {
  category: { name: 'Contacts', url: 'contacts' },
};

export const Contacts = () => {
  return (
    <section className="contact">
      <div className="contacts__breadcrumbs">
        <Breadcrumbs data={BREADCRUBS_DATA} />
      </div>
      <h1 className="contacts__title text__h1">Contact Us</h1>
      <p className="text__body">
        We would love to hear from you!
        Feel free to contact us using the information below:
      </p>

      <h2 className="contacts__subtitle text__h2">Contact Information</h2>
      <p className="text__body">
        {'Email: '}
        <a className="text__body" href="mailto:info@example.com">
          info@example.com
        </a>
      </p>
      <p className="text__body">Phone: +123-456-7890</p>
      <p className="text__body">Address: 123 Main Street, City, Country</p>

      <h2 className="contacts__subtitle text__h2">Location</h2>
      <p className="text__body">Find us on Google Maps:</p>
      <iframe
        className="contacts__map"
        title="Map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d801431.2533879483!2d-90.7631774352516!3d38.830894758111114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1695410308837!5m2!1suk!2sua"
        width="600"
        height="450"
        loading="lazy"
      />
    </section>
  );
};

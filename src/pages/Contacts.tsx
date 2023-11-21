import { BreadCrumbs } from '../components/BreadCrumbs';
import './Contacts.scss';

export const Contacts = () => {
  return (
    <div className="contacts">
      <div className="contacts__bread-crumbs">
        <BreadCrumbs />
      </div>

      <h1 className="contacts__title">
        Contacts
      </h1>

      <a href="mailto:vlkzmn@gmail.com" className="contacts__link">
        vlkzmn@gmail.com
      </a>
    </div>
  );
};

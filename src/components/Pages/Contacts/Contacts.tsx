import './Contacts.scss';

export const Contacts = () => {
  return (
    <div className="contacts">
      <div className="contacts__block">
        <h1 className="contacts__title">Contacts</h1>
        <div>
          <p>
            Mobile:
            {' '}
            <a
              href="tel:34 504 234 125"
              className="contacts-link"
            >
              +34 504 234 125
            </a>

          </p>
          <p>
            Email:
            {' '}
            <a
              href="mailto:alina.yermolenko27@gmail.com"
              className="contacts-link"
            >
              alina.yermolenko27@gmail.com
            </a>
          </p>
          <p>
            Github:
            {' '}
            <a
              href="https://github.com/Alina-Yermolenko"
              className="contacts-link"
            >
              https://github.com/Alina-Yermolenko
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

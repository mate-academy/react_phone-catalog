import './FooterButtons.scss';

export const FooterButtons = () => {
  return (
    <div className="foobuttons">
      <ul className="foobuttons__menu">
        <li
          className="foobuttons__menuitem"
        >
          <a
            href="https://github.com/vlasiuk-anatolii"
            className="foobuttons__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>

        <li className="foobuttons__menuitem">
          <a
            href="/"
            className="foobuttons__link"
          >
            Contacts
          </a>
        </li>

        <li className="foobuttons__menuitem">
          <a
            href="/"
            className="foobuttons__link"
          >
            Rights
          </a>
        </li>
      </ul>

    </div>
  );
};

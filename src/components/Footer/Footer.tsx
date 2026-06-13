import { Link } from 'react-router-dom';

export const Footer = () => {
  //#region handlefunctions
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  //#endregion

  return (
    <div>
      <Link to="/">
        <img src="/img/logo/logo.png" alt="Nice Gadgets Logo" />
      </Link>
      <ul>
        <li>
          <a
            href="https://github.com/shtoikoihor"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/ihorshtoikodev/"
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>
        </li>
        <li>Rights</li>
      </ul>

      <button type="button" onClick={handleScrollTop}>
        <span>Back to top</span>
        <img src="/img/icons/button_top_icon.png" alt="" />
      </button>
    </div>
  );
};

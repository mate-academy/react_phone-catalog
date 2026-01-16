/* eslint-disable max-len */
import s from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={`footer p-0 ${s.footer}`}>
      <div className="container p-5">
        <div className="is-flex is-justify-content-space-between is-align-items-center">
          <a href="#">
            <img src="/img/logo/logo.png" alt="Logo" />
          </a>
          <a href="#">Github</a>
          <a href="#">Contacts</a>
          <a href="#">rights</a>
          <button type="button">Back to top</button>
        </div>
      </div>
    </footer>
  );
};

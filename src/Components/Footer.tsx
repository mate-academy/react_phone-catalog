import '../style/main.scss';

const contacts = 'https://www.instagram.com/andrew_yelieva/';
const gitHub = 'https://github.com/AndriiYelieva';

export const Footer = () => {
  return (
    <div className="container--footer">
      <div className="footer">
        <div className="footer__logo" />
        <div className="footer__description">
          <a
            className="footer__link"
            href={gitHub}
          >
            Github
          </a>
          <a
            className="footer__link"
            href={contacts}
          >
            Contacts
          </a>
          <a
            className="footer__link"
            href={gitHub}
          >
            Rights
          </a>
        </div>

        <div className="footer__button">
          <p className="footer__button--text">Back to top</p>

          <button
            type="button"
            className="footer__button--arrow"
            aria-label="Mute volume"
          />
        </div>
      </div>
    </div>
  );
};

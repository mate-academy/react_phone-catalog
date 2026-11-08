import './footer.scss';

export const FooterRender = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <h2 className="footer__title">
          Nice Gadgets, By: &copy; Francisco Pelegrini
        </h2>
        <div className="infos">
          <a
            href="https://github.com/FRANCISCOPELEGRINI"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/francisco-pelegrini-422234370/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
        </div>
      </div>
      <button
        type="button"
        className="footer__top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to Top
      </button>
    </footer>
  );
};

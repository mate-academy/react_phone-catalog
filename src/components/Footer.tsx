import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";

const GITHUB = 'https://github.com/oskushnir';

const getActiveLink = (isActive: { isActive: boolean }) =>
  classNames("footer-link", { "footer-link--active": isActive });

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="shadow-[0_-1px_0_0_rgba(226,230,233,1)]">
      <div className="footer">
        <Link to="/" className="col-[1/5] mb-[32px] h-[32px] w-[89px] sm:mb-0 xl:col-[1/8]">
          <img src="./img/icons/Logo.svg" alt="Logo" className="h-[32px] w-[89px]" />
        </Link>

        <div className="footer-nav">
          <NavLink
            to={GITHUB}
            target="_blank"
            className={getActiveLink}
          >Github</NavLink>

          <NavLink
            to={GITHUB}
            target="_blank"
            className={getActiveLink}
          >Contacts</NavLink>

          <NavLink
            to={GITHUB}
            target="_blank"
            className={getActiveLink}
          >Rights</NavLink>
        </div>

        <div
          onClick={scrollToTop}
          className="footer-back-top"
        >
          <p
            className="
              text-[12px]
              font-bold 
              leading-[15.34px] 
              text-secondary
              transition-all
              duration-300
              ease-in-out
              hover:text-primary
            "
          >Back to top</p>

          <button className="footer-button">
            <img
              src="./img/icons/Arrow_Right_Black.svg"
              alt="ArrowTop"
              className="icons -rotate-90"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
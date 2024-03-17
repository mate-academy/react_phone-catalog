import { Link, useLocation } from "react-router-dom";
import "./Footer.scss";
import { useEffect, useState } from "react";

export const Footer = () => {
  const location = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    setShowButton(windowHeight < pageHeight);
  }, [location]);

  return (
    <footer className="Footer">
      <div className="Footer__leftContainer">
        <Link to="/">
          <img src="./img/logo.svg" alt="Logo" />
        </Link>
      </div>

      <div className="Footer__center">
        <ul>
          <li className="Footer__center-item">
            <Link to="https://github.com/Anmonnn">Github</Link>
          </li>
          <li className="Footer__center-item">
            <Link to="https://github.com/Anmonnn">Contacts</Link>
          </li>
          <li className="Footer__center-item">
            <Link to="https://github.com/Anmonnn">Rights</Link>
          </li>
        </ul>
      </div>

      <div className="Footer__rightContainer">
        {showButton && (
          <>
            <p>Back to top</p>
            <button
              type="button"
              className="ArrowUp"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="./img/ArrowUp.png"
                alt="Logo"
                className="ArrowUp__link"
              />
            </button>
          </>
        )}
      </div>
    </footer>
  );
};

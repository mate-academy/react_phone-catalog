import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="footer-container">
      <div className="footer-info">
        <span>
          {'Task: '}
          <a href="/#">phones catalog</a>
        </span>
        <span>
          {'Pull request: '}
          <a href="/#">Hlybchenko</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

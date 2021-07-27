import React from "react";
import './Footer.scss'
import { HashLink } from 'react-router-hash-link';


export const Footer = () => (
  <footer className="footer">
    <nav className="footer-nav">
      <span>LOGO</span>
      <div>
        <a className="link" href="https://github.com/georgy-dzumenko/react_phone-catalog">
          Github
        </a>
      </div>
      <div>
        <HashLink className="link" smooth to={{hash: 'top'}}>
          <div className="row_gap_10px row_align_center">
            <span>back to top</span>
            <button className="square-button square-button_size_small">
              <i className="arrow_color_black arrow_direction_up"/>
            </button>
          </div>
        </HashLink>
      </div>
    </nav>
  </footer>
)

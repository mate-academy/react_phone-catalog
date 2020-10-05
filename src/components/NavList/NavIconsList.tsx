import React from 'react';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NavIconsListProps = {
  list: Link[];
}

export const NavIconsList = ( { list } :NavIconsListProps) => {

  return (
   <>
      <li className="nav__footer-item"
        key={list[0].title}
      >
        <a href={list[0].path} className="nav__footer-link">
        <FontAwesomeIcon icon={faGithub} className="fa-2x nav__footer-link-icon" />
        </a>
      </li>
      <li className="nav__footer-item"
        key={list[1].title}
      >
        <a href={list[1].path} className="nav__footer-link">
        <FontAwesomeIcon icon={faLinkedin} className="fa-2x nav__footer-link-icon" />
        </a>
      </li>
      <li className="nav__footer-item"
        key={list[2].title}
      >
        <a href={list[2].path} className="nav__footer-link">
        <FontAwesomeIcon icon={faCopyright} className="fa-2x nav__footer-link-icon" />
        </a>
      </li>
    </>
  )
}

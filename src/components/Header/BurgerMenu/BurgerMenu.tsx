import React, {useEffect} from "react";

import {NavBar} from "../NavBar/NavBar";
import {UserLinksGroup} from "../UserLinksGroup/UserLinksGroup";
import classNames from "classnames";

type Props = {
  isOpen: boolean;
};

export const BurgerMenu: React.FC<Props> = ({isOpen}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });

  return (
    <div
      className={classNames("burger-menu", {
        "burger-menu__isOpen": isOpen,
        "burger-menu__isClose": !isOpen,
      })}
    >
      <div className="nav-bar__wrapper">
        <NavBar />
      </div>

      <div className="links-group__wrapper">
        <UserLinksGroup />
      </div>
    </div>
  );
};

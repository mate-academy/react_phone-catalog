import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Logo.module.scss";

export const Logo: React.FC = () => {
  return (
    <NavLink
      to='/'
      className={styles.logo}
    >
      <img 
        className={styles.img} 
        src="../../../public/img/icons/Logo.svg" 
        alt="Logo" 
      />
    </NavLink>
  )
}
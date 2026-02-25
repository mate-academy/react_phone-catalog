import React from "react";
import styles from "./BackButton.module.scss";
import classNames from "classnames";

export const BackButton: React.FC = () => {
  return (
    <a
      className={classNames(
        styles.button,
        "details__back-button",
        "text-small",
      )}
    >
      <img
        src="/img/general/icons/arrow.svg"
        alt="arrow"
        className={styles.arrow}
      />
      Back
    </a>
  );
};

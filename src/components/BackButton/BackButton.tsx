import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";
import { getAssetPath } from "../../utils";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={onBack}
      className={classNames(styles.button, "text-small")}
    >
      <img
        src={getAssetPath("img/general/icons/arrow.svg")}
        alt="arrow"
        className={styles.arrow}
      />
      Back
    </button>
  );
};

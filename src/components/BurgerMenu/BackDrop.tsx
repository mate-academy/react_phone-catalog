import React from "react";
import "./BackDrop.scss";

type BackdropProps = {
  backdropClickHandler: () => void;
}

export const Backdrop: React.FC<BackdropProps> = ({ backdropClickHandler }) => (
  <div className="backdrop" onClick={backdropClickHandler}></div>
);

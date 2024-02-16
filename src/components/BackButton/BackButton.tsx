import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.scss";

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      data-cy="backButton"
      className="backButton"
      onClick={() => navigate("..")}
    >
      <div className="icon icon--left" />
      Back
    </button>
  );
};

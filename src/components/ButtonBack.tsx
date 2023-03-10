// import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="cart__navigate button-back"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};

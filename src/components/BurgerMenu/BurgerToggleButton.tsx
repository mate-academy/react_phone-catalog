import React from 'react'
import './BurgerToggleButton.scss';

type ToggleButtonProps = {
  toggleClickHandler: () => void;
}

export const BurgerToggleButton: React.FC<ToggleButtonProps> = ({ toggleClickHandler }) => {
  return (
      <button className="toggle-button" onClick={toggleClickHandler}>
        <div className="toggle-button__line"></div>
        <div className="toggle-button__line"></div>
        <div className="toggle-button__line"></div>
      </button>
  )
}


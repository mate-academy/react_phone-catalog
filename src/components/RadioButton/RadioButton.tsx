import React from "react";
import './RadioButton.scss'

interface Props {
  options: {
    value: string;
    text: string;
  }[]
}

export const RadioButton: React.FC<Props> = ({ options }) => {
  return (<div className="radio-buttons-list">
    {options.map((option) => (
      <div onClick={() => console.log(option.value)} className="list__button">

      </div>
    ))}
  </div>)
}
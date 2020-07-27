import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Option {
  title: string;
  option: string | undefined;
}

interface Props {
  optionsList: Option[];
}

export const Options: React.FC<Props> = ({ optionsList }) => {
  return (
    <ul className="options">
      {
        optionsList.map((option) => (
          <li className="options__wrapper" key={uuidv4()}>
            <p className="options__option">{option.title}</p>
            <p className="options__value">{option.option}</p>
          </li>
        ))
      }
    </ul>
  );
};

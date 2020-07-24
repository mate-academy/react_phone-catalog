import React from 'react';

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
        optionsList.map(option => (
          <li className="options__wrapper" key={option.title}>
            <p className="options__option">{option.title}</p>
            <p className="options__value">{option.option}</p>
          </li>
        ))
      }
    </ul>
  );
}

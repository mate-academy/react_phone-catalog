import React, { useState } from 'react';

type Props = {
  sortBy: string;
  label: string;
  handleChange: React.Dispatch<React.ChangeEvent<HTMLSelectElement>>;
  sortKeys: string[];
  sortValues: string[];
};

export const Selector: React.FC<Props> = ({
  sortBy,
  label,
  handleChange,
  sortKeys,
  sortValues,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    handleChange({
      target: {
        value,
      },
    } as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  const selectedText = sortKeys.find((_, i) => sortBy === sortValues[i])
    || 'all';

  return (
    <div className="selector">
      <p className="selector__title">{label}</p>

      <button
        className="selector__button"
        onClick={handleButtonClick}
        type="button"
      >
        {selectedText}
        <span className="selector__iconContainer">
          <div className="selector__iconContainer--icon" />
        </span>
      </button>

      {isOpen && (
        <ul className="selector__options">
          {sortKeys.map((selector, i) => (
            <button
              className={`selector__option ${sortBy === sortValues[i]
                ? 'selected'
                : ''}`}
              onClick={() => handleOptionClick(sortValues[i])}
              key={selector}
              type="button"
            >
              {selector}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

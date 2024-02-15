import React, { memo, useState } from 'react';

import './OptionsToggler.scss';

export interface OptionsTogglerItemProps {
  option: string,
  isSelected?: boolean,
}

interface Props {
  name: string,
  options: string[],
  Item: React.FC<OptionsTogglerItemProps>,
  selectedOption?: string,
  onOptionChange?: (option: string) => void,
  className?: string,
}

export const OptionsToggler: React.FC<Props> = memo(({
  name,
  options,
  Item,
  selectedOption = options[0],
  onOptionChange = () => { },
  className,
}) => {
  const [currentOption, setCurrentOption] = useState(selectedOption);

  const setOption = (option: string) => () => {
    setCurrentOption(option);
    onOptionChange(option);
  };

  return (
    <article className={`options-toggler ${className}`}>
      <h4 className="options-toggler__title">{name}</h4>

      <ul className="options-toggler__options">
        {options.map(option => (
          <li
            className="options-toggler__option"
            onClick={setOption(option)}
            key={option}
          >
            <Item option={option} isSelected={option === currentOption} />
          </li>
        ))}
      </ul>
    </article>
  );
});

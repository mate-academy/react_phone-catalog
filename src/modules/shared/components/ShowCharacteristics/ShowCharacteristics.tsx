// eslint-disable-next-line max-len
import cn from 'classnames';
import React from 'react';

export type Char = { title: string; value: string | null };

interface Props {
  chars: Char[];
  additionalClass?: string;
}

export const ShowCharacteristics: React.FC<Props> = ({
  chars,
  additionalClass = '',
}) => {
  return (
    <ul className={cn('showChars__characteristics', additionalClass)}>
      {chars.map(char => {
        return (
          <li key={char.title} className="showChars__item">
            <span className="showChars__characteristic">{char.title}</span>
            <span className="showChars__characteristicValue">{char.value}</span>
          </li>
        );
      })}
    </ul>
  );
};

import { FC } from 'react';

import en from '../../../images/flag/en.svg';

type TProps = {
  flag: string;
};

export const LanguageIcon: FC<TProps> = ({ flag }) => {
  return (
    <span>
      <img src={flag || en} alt="asd" width="38" height="38" />
    </span>
  );
};

import React from 'react';
import './LanguageSwitch.scss';
import { useLanguage } from '../../../../../../context/LanguageContext';
import { Icon } from '../../../Icon';

type Props = {
  className: string;
};

export const LanguageSwitch: React.FC<Props> = ({ className }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`language-switch ${className}`}>
      <select
        className="language-switch__select"
        name="language-switch"
        value={language}
        onChange={e => setLanguage(e.target.value as 'uk' | 'en')}
      >
        <option value="uk" className="language-switch__value">
          UK
        </option>
        <option value="en" className="language-switch__value">
          EN
        </option>
      </select>
      <Icon className="language-switch__icon" name="arrow-down" disabled />
    </div>
  );
};

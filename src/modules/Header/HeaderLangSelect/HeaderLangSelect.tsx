import './HeaderLangSelect.scss';
import ReactSelect, { StylesConfig } from 'react-select';
import { SelectOption } from '../../../types/SelectOptions';
import { useLangSelect } from '../../hooks';

const HeaderLangSelect: React.FC = () => {
  const hideBorder = true;
  const menuPlacementTop = false;

  const customStyles: StylesConfig<SelectOption, false> = {
    control: (_provided, state) => ({
      borderColor: hideBorder ? (state.isFocused ? '' : 'transparent') : '',
    }),
    menu: () => {
      if (menuPlacementTop) {
        return { bottom: 'calc(100% + 4px)' };
      }

      return { top: 'calc(100% + 4px)' };
    },
    option: () => ({}),
    placeholder: () => ({}),
  };

  const { language, langOptions, selectLanguage } = useLangSelect();

  return (
    <ReactSelect<SelectOption>
      className="langSelect__container"
      classNamePrefix="langSelect"
      options={langOptions}
      // menuIsOpen={false}
      onChange={selectLanguage}
      value={language}
      menuPlacement={'bottom'}
      isSearchable={false}
      unstyled={true}
      styles={customStyles}
    />
  );
};

export default HeaderLangSelect;

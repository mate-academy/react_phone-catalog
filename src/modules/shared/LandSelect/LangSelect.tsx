import { useLangSelect } from '../../hooks';
import Select from '../Select';

const LangSelect: React.FC<{ menuPlacementTop?: boolean }> = ({
  menuPlacementTop = true,
}) => {
  const { language, langOptions, selectLanguage } = useLangSelect();

  return (
    <Select
      value={language}
      options={langOptions}
      onChange={selectLanguage}
      menuPlacementTop={menuPlacementTop}
    />
  );
};

export default LangSelect;

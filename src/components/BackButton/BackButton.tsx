import { useSelector } from 'react-redux';
import themeStyles from '../../styles/utils/themeStyles';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const { arrow } = themeStyles(currentTheme === 'light-theme');

  const handleBackClick = () => {
    navigate('..');
  };

  return (
    <button className="back-button" onClick={handleBackClick}>
      <img src={arrow} alt="Back button" className="icon icon-left" />
      <span className="text-gray">Back</span>
    </button>
  );
};

import PreviousGroupIcon from '../SliderIconPrevious';
import NextGroupIcon from '../sliderIconNext/NextGroupIcon';
import './SliderButtons.scss';

type SliderProps = {
  totalGroups: number;
  currentGroup: number;
  setCurrentGroup: (currentGroup: number) => void;
};

export const SliderButtons: React.FC<SliderProps> = ({
  totalGroups,
  currentGroup,
  setCurrentGroup,
}) => {
  const goToNextGroup = () => {
    if (currentGroup < totalGroups) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const goToPreviousGroup = () => {
    if (currentGroup > 1) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  return (
    <div className="slider-buttons">
      <button
        type="button"
        onClick={goToPreviousGroup}
        disabled={currentGroup === 1}
        className="
        slider-buttons__button-container slider-buttons__button-container--left
        "
      >
        <PreviousGroupIcon disabled={currentGroup === 1} />
      </button>
      <button
        type="button"
        onClick={goToNextGroup}
        disabled={currentGroup === totalGroups}
        className="slider-buttons__button-container"
      >
        <NextGroupIcon disabled={currentGroup === totalGroups} />
      </button>
    </div>
  );
};

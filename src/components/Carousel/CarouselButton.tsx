type ActionType = 'prev' | 'next';

type Props = {
  action: ActionType,
  hadnleClick: (action: ActionType) => void,
};

export const CarouselButton:React.FC<Props> = ({ action, hadnleClick }) => (
  <button
    type="button"
    className={`button carousel__button carousel__button--${action}`}
    onClick={() => {
      hadnleClick(action);
    }}
  >
    {' '}
  </button>
);

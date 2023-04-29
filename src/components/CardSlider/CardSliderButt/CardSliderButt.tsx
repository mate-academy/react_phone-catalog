import cn from 'classnames';

const buttonClasses = (idDis: boolean) => cn(
  'button-block',
  { 'button-dis': idDis },
);

type Props = {
  img: string;
  isDis: boolean;
  move: () => void;
};

const CardSliderButt: React.FC<Props> = ({ img, isDis, move }) => (
  <button
    type="button"
    className={buttonClasses(isDis)}
    onClick={move}
  >
    <img src={img} alt="icon" />
  </button>
);

export default CardSliderButt;

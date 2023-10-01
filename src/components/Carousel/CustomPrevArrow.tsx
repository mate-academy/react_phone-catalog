import arrowLeft from '../../img/icons/ArrowLeft.svg';

type Props = {
  stylesName: string,
  onClick?: () => void,
};
export const CustomPrevArrow: React.FC<Props> = ({ stylesName, onClick }) => {
  return (
    <button className={stylesName} type="button" onClick={onClick}>
      <img src={arrowLeft} alt="arrowLeft" />
    </button>
  );
};

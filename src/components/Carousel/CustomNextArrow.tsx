import arrowRight from '../../img/icons/ArrowRight.svg';

type Props = {
  stylesName: string,
  onClick?: () => void,
};
export const CustomNextArrow: React.FC<Props> = ({ stylesName, onClick }) => {
  return (
    <button className={stylesName} type="button" onClick={onClick}>
      <img src={arrowRight} alt="arrowRight" />
    </button>
  );
};

import homeIcon from '../../img/icon/Home.png';
import arrowRight from '../../img/icon/ArrowRight.png';

type Props = {
  title: string;
};

export const HomeIcon: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <img src={homeIcon} alt="homeIcon" />
      <img src={arrowRight} alt="homeIcon" />
      <span>{title}</span>
    </div>
  );
};

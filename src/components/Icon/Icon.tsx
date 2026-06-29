import { IconName, ICONS } from '../../constants/icons';
import style from './Icon.module.scss';

type Props = {
  name: IconName;
};

export const Icon: React.FC<Props> = ({ name }) => {
  const SVGIcon = ICONS[name];

  if (!SVGIcon) {
    return null;
  }

  return <SVGIcon className={style.icon} />;
};

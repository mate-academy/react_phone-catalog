import { type IconName, iconNameToIcon } from './common';

type Properties = {
  iconName: IconName;
  classNames?: string;
};

const Icon: React.FC<Properties> = ({ iconName, classNames }) => {
  const SvgIcon = iconNameToIcon[iconName];

  return <SvgIcon className={classNames} />;
};

export { Icon };

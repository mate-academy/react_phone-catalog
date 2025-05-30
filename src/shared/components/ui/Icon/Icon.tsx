import { IconName, icons } from './iconsMap';

type Props = {
  name: IconName;
  className?: string;
};

export const Icon: React.FC<Props> = ({ name, className }) => {
  const IconComponent = icons[name];

  return <IconComponent className={className} />;
};

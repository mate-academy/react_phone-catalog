import { ButtonsProps } from '../../types/Menu-UIProps';
import styles from './menu-button.module.scss';

type Props = {
  data: ButtonsProps;
  className: string;
};

export const MenuButton: React.FC<Props> = ({ data, className }) => {
  const { name, path } = data;

  return (
    <button
      className={`${styles['menu-button']} ${className}`}
      aria-label={`${name}`}
      style={{ backgroundImage: `url(/src/shared/ui/icons${path})` }}
    />
  );
};

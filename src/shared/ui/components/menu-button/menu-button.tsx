import { MenuButtonsProps } from '../../../types/Menu-UIProps';
import './menu-button.scss';

type Props = {
  data: MenuButtonsProps;
};

export const MenuButton: React.FC<Props> = ({ data }) => {
  const { name, path } = data;

  return (
    <button className="menu-button" aria-label={`Open ${name}`}>
      <img
        src={`/src/shared/ui/icons${path}`}
        alt=""
        className="menu-button__image"
      />
    </button>
  );
};

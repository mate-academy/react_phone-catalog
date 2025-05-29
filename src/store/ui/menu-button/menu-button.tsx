import classNames from 'classnames';
import { MenuButtonsProps } from '../../types/Menu-UIProps';
import './menu-button.scss';

type Props = {
  data: MenuButtonsProps;
};

export const MenuButton: React.FC<Props> = ({ data }) => {
  const { name, path } = data;

  return (
    <button
      className={classNames('menu-button', `menu-button__${name}`)}
      aria-label={`Open ${name}`}
    >
      <img
        src={`/src/store/icons${path}`}
        alt=""
        className="menu-button__image"
      />
    </button>
  );
};

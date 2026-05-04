import { TopBar } from '../TopBar/TopBar';

type Props = {
  cartItemsCount: number;
};

export const Header: React.FC<Props> = ({ cartItemsCount }) => {
  return (
    <header className="header">
      <div className="header__container">
        <TopBar cartItemsCount={cartItemsCount} />
      </div>
    </header>
  );
};

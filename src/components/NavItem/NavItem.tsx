import { FC } from 'react';
import './NavItem.scss';
type Props = {
  type: string;
  selectedPhonesCount: number;
};

export const NavItem: FC<Props> = ({ selectedPhonesCount, type }) => {
  return (
    <>
      {selectedPhonesCount > 0 && (
        <div className="nav-item--count">{selectedPhonesCount}</div>
      )}
      <i className={`nav-item nav-item-${type}`} />
    </>
  );
};

import './DropDownBlock.scss';
import { DropdownPerPage } from '../DropdownPerPage';
import { SortDropdownMenu } from '../SortDropdownMenu';

export const DropdownBlock = () => {
  return (
    <div className="dropdownBlock">
      <SortDropdownMenu />

      <DropdownPerPage />
    </div>
  );
};

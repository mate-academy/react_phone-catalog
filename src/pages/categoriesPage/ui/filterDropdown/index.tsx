import { DropDown } from './ui/dropDown';
import { sortByOrder, itemsAmount } from './model/dropdownValues';
import styles from './styles/dropdownList.module.scss';
import { ItemsAmount, Order } from '@shared/types/filterEnums';

type Props = {
  setFilter: (value: Order) => void;
  setAmount: (value: ItemsAmount) => void;
};

export const DropdownList = ({ setFilter, setAmount }: Props) => {
  return (
    <div className={styles.container}>
      <DropDown items={sortByOrder} fn={setFilter} content={'Sort by'} />
      <DropDown items={itemsAmount} fn={setAmount} content={'Items on page'} />
    </div>
  );
};

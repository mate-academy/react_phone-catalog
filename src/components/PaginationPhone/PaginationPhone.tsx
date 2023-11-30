import { useSearchParams } from 'react-router-dom';
import './PaginationPhone.scss';

type Props = {
  itemOnPage: number;
  setItemOnPage: (value: number) => void;
};

export const PaginationPhone: React.FC<Props>
= ({ itemOnPage, setItemOnPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    setItemOnPage(+event.target.value);
    params.set('itemOnPage', event.target.value);
    setSearchParams(params);
  };
  // console.log(() => setItemOnPage);
  // console.log(searchParams.get('itemOnPage'));

  const options = [4, 8, 16];

  return (
    <div className="pagination">
      <p> Items on page </p>
      <select
        className="pagination__select"
        value={itemOnPage}
        onChange={handleItemChange}
      >
        {options.map(
          value => <option key={value} value={value}>{value}</option>,
        )}
      </select>
    </div>
  );
};

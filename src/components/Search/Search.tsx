import './Search.scss';

type Props = {
  page: string,
};

export const Search: React.FC<Props> = ({ page }) => {
  return (
    <div className="Search">
      <input
        type="text"
        className="Search__input"
        placeholder={`Search in ${page}...`}
      />
    </div>
  );
};

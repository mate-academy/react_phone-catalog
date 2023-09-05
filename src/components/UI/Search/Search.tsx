import './search.scss';

type Props = {
  catPath: string;
};

export const Search: React.FC<Props> = ({ catPath }) => {
  const catName = catPath.slice(1);

  return (
    <form className="search">
      <label className="search__label">
        <input
          type="search"
          className="search__input"
          placeholder={`Search in ${catName}...`}
        />

        <img src="./img/icons/Search.svg" alt="Search" />
      </label>
    </form>
  );
};

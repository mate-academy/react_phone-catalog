import styles from '../Dropdown.module.scss';

interface SortByProps {
  sortBy: string;
  setSortOpen: (p: boolean) => void;
  sortOpen: boolean;
  sortOptions: string[];
  setSortBy: (p: string) => void;
}

export const SortBy: React.FC<SortByProps> = ({
  sortBy,
  setSortOpen,
  sortOpen,
  sortOptions,
  setSortBy,
}) => {
  return (
    <div className={styles.sortBy}>
      <div>Sort by</div>
      <button
        className={`
          ${styles.button}
          ${sortOpen ? styles.activeButton : ''}
          ${sortBy !== 'Newest' ? styles.valueCurrent : ''}
        `}
        onClick={() => setSortOpen(!sortOpen)}
      >
        {sortBy}
        <img
          src="./img/SliderImg/Down.svg"
          alt="Down"
          style={{
            background: 'none',
          }}
        />
      </button>

      {sortOpen && (
        <ul className={styles.sortList}>
          {sortOptions.map(option => (
            <li
              key={option}
              className={styles.item}
              onClick={() => {
                setSortBy(option);
                setSortOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

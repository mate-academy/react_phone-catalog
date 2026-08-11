import arrowDown from '../../../public/img/icons/ArrowDown.png';
import styles from './ProductSort.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
};

export const ProductsSort = ({
  isOpen,
  setIsOpen,
  selectedOption,
  setSelectedOption,
  setSortOption,
}: Props) => {
  const handleSelectOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.productSort__filter}>
      <span className={styles.productSort__filterText}>Sort by</span>
      <div className={styles.productSort__select}>
        <div className={styles.productSort__trigger} onClick={handleSelectOpen}>
          <span className={styles.productSort__triggerText}>
            {selectedOption}
          </span>
          <div className={styles.productSort__triggerArrow}>
            <img src={arrowDown} alt="Arrow Down" />
          </div>
        </div>
        {isOpen && (
          <div className={styles.productSort__options}>
            <div
              className={styles.productSort__option}
              onClick={() => {
                setSelectedOption('Newest');
                setIsOpen(false);
                setSortOption('Newest');
              }}
            >
              Newest
            </div>
            <div
              className={styles.productSort__option}
              onClick={() => {
                setSelectedOption('Alphabetically');
                setIsOpen(false);
                setSortOption('Alphabetically');
              }}
            >
              Alphabetically
            </div>
            <div
              className={styles.productSort__option}
              onClick={() => {
                setSelectedOption('Cheapest');
                setIsOpen(false);
                setSortOption('Cheapest');
              }}
            >
              Cheapest
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

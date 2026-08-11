import arrowDown from '../../../public/img/icons/ArrowDown.png';
import styles from './ProductPerPage.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  postPerPage: string | number;
  setPostPerPage: (value: number | 'All') => void;
};

export const ProductsPerPage = ({
  isOpen,
  setIsOpen,
  postPerPage,
  setPostPerPage,
}: Props) => {
  const handleSelectOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.productsPerPage__filter}>
      <span className={styles.productsPerPage__filterText}>Items on page</span>
      <div className={styles.productsPerPage__select}>
        <div
          className={styles.productsPerPage__trigger}
          onClick={handleSelectOpen}
        >
          <span className={styles.productsPerPage__triggerText}>
            {postPerPage}
          </span>
          <div className={styles.productsPerPage__triggerArrow}>
            <img src={arrowDown} alt="Arrow Down" />
          </div>
        </div>
        {isOpen && (
          <div className={styles.productsPerPage__options}>
            <div
              className={styles.productsPerPage__option}
              onClick={() => {
                setPostPerPage(4);
                setIsOpen(false);
              }}
            >
              4
            </div>
            <div
              className={styles.productsPerPage__option}
              onClick={() => {
                setPostPerPage(8);
                setIsOpen(false);
              }}
            >
              8
            </div>
            <div
              className={styles.productsPerPage__option}
              onClick={() => {
                setPostPerPage(16);
                setIsOpen(false);
              }}
            >
              16
            </div>
            <div
              className={styles.productsPerPage__option}
              onClick={() => {
                setPostPerPage('All');
                setIsOpen(false);
              }}
            >
              All
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

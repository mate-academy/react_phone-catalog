import { FC } from 'react';
import styles from './SearchButton.module.scss';
import { IoSearch } from 'react-icons/io5';
import classNames from 'classnames';

interface Props {
  className?: string;
  onClick?: () => void;
}

export const SearchButton: FC<Props> = ({ className, onClick }) => {
  return (
    <button
      className={classNames(styles.searchBtn, className)}
      onClick={onClick}
    >
      <IoSearch size={16} />
    </button>
  );
};

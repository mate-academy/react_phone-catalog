import { Button } from '@/shared/components/Button';
import styles from './PaginationItem.module.scss';

type Props = {
  element: number;
  currentPage: number;
  onClick: () => void;
};

export const PaginationItem: React.FC<Props> = ({
  element,
  currentPage,
  onClick,
}) => {
  return (
    <Button
      className={element === currentPage ? styles.active : ''}
      onClick={onClick}
    >
      {element}
    </Button>
  );
};

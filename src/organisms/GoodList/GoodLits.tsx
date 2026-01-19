import { FC, useState } from 'react';
import { GoodCard } from './ui/GoodCard';
import { Phone } from '@/types/phone';
import styles from './GoodList.module.scss';
import Button from '@/atoms/Button';
import Chevron from '@/assets/icons/chevron.svg?react';

type Props = {
  items: Phone[];
};

export const GoodList: FC<Props> = ({ items }) => {
  const [page, setPage] = useState(0);

  const next = () => {
    setPage(page + 4);
  };

  const prev = () => {
    setPage(page - 4);
  };

  return (
    <div className={styles.container}>
      <Button
        classNames={styles.button__left}
        onClick={prev}
        disabled={page === 0}
      >
        <Chevron />
      </Button>

      <Button
        classNames={styles.button__right}
        onClick={next}
        disabled={page + 4 >= items.length}
      >
        <Chevron />
      </Button>

      <div className={styles.list}>
        {items.slice(page, page + 4).map(item => (
          <GoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

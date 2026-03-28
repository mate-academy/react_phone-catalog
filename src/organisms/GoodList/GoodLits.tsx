import { FC, useState } from 'react';
import { GoodCard } from './ui/GoodCard';
import { Phone } from '@/types/phone';
import styles from './GoodList.module.scss';
import Button from '@/atoms/Button';
import Section from '@/atoms/Section';
import Chevron from '@/assets/icons/chevron.svg?react';

type Props = {
  items: Phone[];
  title: string;
};

export const GoodList: FC<Props> = ({ items, title }) => {
  const pageSize = 4;
  const [page, setPage] = useState(0);

  const next = () => {
    setPage(prevPage => prevPage + pageSize);
  };

  const prev = () => {
    setPage(prevPage => prevPage - pageSize);
  };

  return (
    <Section>
      <div className={styles.container}>
        <Section.Title className={styles.title}>{title}</Section.Title>

        <div className={styles.button__container}>
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
            disabled={page + pageSize >= items.length}
          >
            <Chevron />
          </Button>
        </div>

        <div className={styles.list}>
          {items.slice(page, page + pageSize).map(item => (
            <GoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
};

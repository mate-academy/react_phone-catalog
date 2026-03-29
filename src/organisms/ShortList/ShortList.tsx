import { FC, useState } from 'react';
import { Button, ItemCard, Section } from '@/atoms';
import { Phone } from '@/types/phone';
import s from './ShortList.module.scss';
import Chevron from '@/assets/icons/chevron.svg?react';

type Props = {
  items: Phone[];
  title: string;
  pageSize?: number;
  discount?: boolean;
};

export const ShortList: FC<Props> = ({ items, title, pageSize = 4, discount }) => {
  const [page, setPage] = useState(0);

  const next = () => {
    setPage(prevPage => prevPage + pageSize);
  };

  const prev = () => {
    setPage(prevPage => prevPage - pageSize);
  };

  return (
    <Section>
      <div className={s.container}>
        <Section.Title className={s.title}>{title}</Section.Title>

        <div className={s.button__container}>
          <Button
            classNames={s.button__left}
            onClick={prev}
            disabled={page === 0}
          >
            <Chevron />
          </Button>

          <Button
            classNames={s.button__right}
            onClick={next}
            disabled={page + pageSize >= items.length}
          >
            <Chevron />
          </Button>
        </div>

        <div className={s.list}>
          {items.slice(page, page + pageSize).map(item => (
            <ItemCard key={item.id} item={item} discount={discount} />
          ))}
        </div>
      </div>
    </Section>
  );
};

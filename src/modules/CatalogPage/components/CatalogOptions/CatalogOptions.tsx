import styles from './CatalogOptions.module.scss';
import './../../../../styles/global.scss';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { SortName } from '../../../../types/SortName';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Select from '@radix-ui/react-select';
import { useSearchParams } from 'react-router-dom';
import { ItemsPerPage } from './../../../../types/ItemsPerPage';
import arrowBottom from './../../../../../public/img/icons/arrowBottom.svg';

type Props = {
  sort: SortName;
  itemsPerPage: ItemsPerPage;
  currentPage: number;
  handlePerPage: (val: ItemsPerPage) => void;
  handleSort: (val: SortName) => void;
  handlePage: (val: number) => void;
};

export const CatalogOptions: FC<Props> = ({
  sort,
  itemsPerPage,
  handlePerPage,
  handleSort,
  handlePage,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') as SortName | null;
  // const perPageParam = searchParams.get('perPage') as ItemsPerPage | null;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sortParam !== null ? handleSort(sortParam) : handleSort(sort);
  }, []);

  return (
    <div className={styles.catalogOptions}>
      <div className={styles.options}>
        <h4 className={styles.title}>Sort by</h4>
        <div className={styles.sort__select}>
          <Select.Root
            value={sort}
            onValueChange={(value: SortName) => {
              handlePage(1);
              handleSort(value);
            }}
            onOpenChange={setIsSortOpen}
          >
            <Select.Trigger
              className={`${styles.trigger} ${isSortOpen ? styles.triggerActive : ''}`}
            >
              <Select.Value />
              <Select.Icon
                className={`${styles.icon} ${isSortOpen ? styles.iconOpen : ''}`}
              >
                <img src={arrowBottom} alt="arrowBottom" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className={styles.content}
                position="popper"
                sideOffset={8}
              >
                <Select.Viewport>
                  <Select.Item value="age" className={styles.item}>
                    <Select.ItemText>Newest</Select.ItemText>
                  </Select.Item>

                  <Select.Item value="title" className={styles.item}>
                    <Select.ItemText>Alphabetically</Select.ItemText>
                  </Select.Item>

                  <Select.Item value="price" className={styles.item}>
                    <Select.ItemText>Cheapest</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>

      <div className={styles.items}>
        <h4 className={styles.title}>Items on page</h4>
        <div className={styles.items__select}>
          <Select.Root
            value={itemsPerPage}
            onValueChange={value => {
              handlePage(1);
              handlePerPage(value);
            }}
            onOpenChange={setIsItemsOpen}
          >
            <Select.Trigger
              className={`${styles.trigger} ${isItemsOpen ? styles.triggerActive : ''}`}
            >
              <Select.Value />
              <Select.Icon
                className={`${styles.icon} ${isItemsOpen ? styles.iconOpen : ''}`}
              >
                <img src={arrowBottom} alt="arrowBottom" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className={styles.content}
                position="popper"
                sideOffset={8}
              >
                <Select.Viewport>
                  <Select.Item value="4" className={styles.item}>
                    <Select.ItemText>4</Select.ItemText>
                  </Select.Item>

                  <Select.Item value="8" className={styles.item}>
                    <Select.ItemText>8</Select.ItemText>
                  </Select.Item>

                  <Select.Item value="16" className={styles.item}>
                    <Select.ItemText>16</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="all" className={styles.item}>
                    <Select.ItemText>all</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
    </div>
  );
};

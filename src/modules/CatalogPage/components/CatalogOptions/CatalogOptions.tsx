import styles from './CatalogOptions.module.scss';
import './../../../../styles/global.scss';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { SortName } from '../../../../types/SortName';
import { ItemsPerPage } from '../../../../types/itemsPerPage';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Select from '@radix-ui/react-select';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../../../types/Product';

type Props = {
  sort: SortName;
  itemsPerPage: ItemsPerPage;
  setSort: Dispatch<SetStateAction<string>>;
  setItemsPerPage: Dispatch<SetStateAction<ItemsPerPage>>;
  currentPage: number;
  sortedProducts: Product[];
  pages: number[];
  isActivePage: number;
  handlePerPage: (val: string | null) => void;
  handleSort: (val: string | null) => void;
};

export const CatalogOptions: FC<Props> = ({
  sort,
  itemsPerPage,
  setSort,
  setItemsPerPage,
  currentPage,
  sortedProducts,
  isActivePage,
  handlePerPage,
  handleSort,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam: string | null = searchParams.get('sort');
  const perPageParam: string | null = searchParams.get('perPage');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sortParam !== null ? handleSort(sortParam) : handleSort(sort);

    if (perPageParam !== null) {
      handlePerPage(perPageParam);
    } else {
      handlePerPage(itemsPerPage);
    }
  }, []);

  return (
    <div className={styles.catalogOptions}>
      <div className={styles.options}>
        <h4 className={styles.title}>Sort by</h4>
        <div className={styles.sort__select}>
          <Select.Root
            value={sort}
            onValueChange={value => {
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
                ∨
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
                ∨
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

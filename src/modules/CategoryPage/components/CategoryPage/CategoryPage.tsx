import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { CurrentPath } from '@modules/shared/components/CurrentPath/';
import { ProductList } from '@modules/ProductPage/components/ProductsList/';
import { shuffle } from 'lodash';
import { Select } from '@modules/shared/components/Select';
import { Pagination } from '@modules/shared/components/Pagination';
import { scrollToTop } from '@mocks/Functions/functions';
import { usePagination } from '@modules/shared/components/Pagination/';
import { Title } from '@modules/shared/components/Title';

// #region Types
interface Props {
  category: Category;
  items: Product[];
}

type TypesOfSort =
  | 'cheap'
  | 'expensive'
  | 'oldest'
  | 'newest'
  | 'discount'
  | 'a-z'
  | 'z-a'
  | 'random'
  | '';

export type OptionType = {
  text: string;
  value: string;
};

// #endregion Types

// #region Sorting functions
const sortOldest = (items: Product[]) => {
  return items.toSorted((item1, item2) => {
    return item1.year - item2.year;
  });
};

const sortNewest = (items: Product[]) => {
  return items.toSorted((item1, item2) => {
    return item2.year - item1.year;
  });
};

const sortExpensive = (items: Product[]) => {
  return items.toSorted((item1, item2) => {
    return item2.price - item1.price;
  });
};

const sortCheap = (items: Product[]) => {
  return items.toSorted((item1, item2) => {
    return item1.price - item2.price;
  });
};

const sortByDiscount = (items: Product[]) => {
  return items.toSorted((item1, item2) => {
    return item2.fullPrice - item2.price - (item1.fullPrice - item1.price);
  });
};

const sortAlphabetically = (items: Product[]) => {
  return items.toSorted((item1, item2) => {
    return item1.name.toLowerCase().localeCompare(item2.name.toLowerCase());
  });
};

const sortReversedAlphabetical = (items: Product[]) => {
  return items.toSorted((item1, item2) => {
    return item2.name.toLowerCase().localeCompare(item1.name.toLowerCase());
  });
};

export function sortItems(items: Product[], sortBy: TypesOfSort) {
  if (!sortBy) {
    return items;
  }

  switch (sortBy) {
    case 'newest': {
      return sortNewest(items);
    }

    case 'oldest': {
      return sortOldest(items);
    }

    case 'expensive': {
      return sortExpensive(items);
    }

    case 'cheap': {
      return sortCheap(items);
    }

    case 'discount': {
      return sortByDiscount(items);
    }

    case 'a-z': {
      return sortAlphabetically(items);
    }

    case 'z-a': {
      return sortReversedAlphabetical(items);
    }

    case 'random': {
      return shuffle(items);
    }
  }
}
// #endregion

// #region Options
const perPageOptions: OptionType[] = [
  { text: 'all', value: '' },
  { text: '4', value: '4' },
  { text: '8', value: '8' },
  { text: '16', value: '16' },
];

const sortByOptions: OptionType[] = [
  { text: 'No sorting', value: '' },
  { text: 'Cheap', value: 'cheap' },
  { text: 'Expensive', value: 'expensive' },
  { text: 'Oldest', value: 'oldest' },
  { text: 'Newest', value: 'newest' },
  { text: 'Discount', value: 'discount' },
  { text: 'A-Z', value: 'a-z' },
  { text: 'Z-A', value: 'z-a' },
];

// #endregion

export const CategoryPage: React.FC<Props> = ({ category, items }) => {
  // Filter items by category
  const categoryItems = useMemo(() => {
    return items.filter(item => item.category === category.id);
  }, [items, category.id]);

  // #region States
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setSortedItems] = useState(categoryItems);
  const [activeItems, setActiveItems] = useState(categoryItems);

  const sortBy: TypesOfSort = (searchParams.get('sortBy') as TypesOfSort) || '';
  const perPage = Number(searchParams.get('perPage')) || categoryItems.length;
  const page = Number(searchParams.get('page')) || 0;

  const prevPerPage = useRef(categoryItems.length);

  const { visiblePages, disabledStates } = usePagination({
    totalItems: categoryItems,
    currentPage: page,
    itemsPerPage: perPage,
  });

  // #endregion

  // #region local functions
  const getNewParams = useMemo(() => {
    return (values: string[][], params?: URLSearchParams) => {
      const p = new URLSearchParams(params || '');

      values.forEach(([key, value]) => {
        if (value) {
          p.set(key, value);
        } else {
          p.delete(key);
        }
      });

      return p.toString();
    };
  }, []);

  const setSortingParam = useCallback(
    (param: string, value: string) => {
      setSearchParams(cur => {
        return getNewParams([[param, value.toString()]], cur);
      });
    },
    [getNewParams, setSearchParams],
  );

  const handlePageChange = (
    toPage: number,
    transfer: boolean = true,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (event) {
      event.preventDefault();
    }

    if (transfer) {
      setSearchParams(
        getNewParams([['page', toPage ? toPage.toString() : '']], searchParams),
      );
    }
  };
  // #endregion

  // #region UseEffects
  useEffect(() => {
    setSortedItems(() => {
      const sorted = sortItems(categoryItems, sortBy);

      setActiveItems(() => {
        return sorted.slice(page * perPage, (page + 1) * perPage);
      });

      return sorted;
    });
  }, [sortBy, categoryItems, page, perPage]);

  useEffect(() => {
    if (
      prevPerPage.current !== perPage &&
      categoryItems.length !== prevPerPage.current
    ) {
      const targetPage =
        Math.round((prevPerPage.current / perPage) * page) || '';

      setSortingParam('page', targetPage.toString());
    }
  }, [perPage, page, setSortingParam, categoryItems.length]);

  useEffect(() => {
    prevPerPage.current = perPage;
  }, [perPage]);

  useEffect(() => {
    scrollToTop();
  }, [activeItems]);
  // #endregion

  return (
    <div className="categoryPage">
      <div className="container categoryPage__container">
        <div className="categoryPage__top">
          <CurrentPath additionalClass="categoryPage__path" />

          <Title
            rawTitle={category.title}
            amountOfitems={categoryItems.length}
          />

          <div className="categoryPage__sort">
            <div className="categoryPage__sortPart categoryPage__sortBy">
              <span className="categoryPage__sortTitle">Sort by</span>
              <Select
                param="sortBy"
                options={sortByOptions}
                onChange={setSortingParam}
                value={sortBy}
              />
            </div>
            <div className="categoryPage__sortPart categoryPage__perPage">
              <span className="categoryPage__sortTitle">Items on page</span>
              <Select
                param="perPage"
                options={perPageOptions}
                onChange={setSortingParam}
                value={perPage.toString()}
              />
            </div>
          </div>
        </div>

        <div className="categoryPage__main">
          <ProductList productsToShow={activeItems} />
        </div>

        <div className="categoryPage__bottom">
          <Pagination
            visiblePages={visiblePages}
            currentPage={page}
            isMoveLeftDisabled={disabledStates.moveLeft}
            isMoveRightDisabled={disabledStates.moveRigth}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

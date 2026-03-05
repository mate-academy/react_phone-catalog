import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  sort: string;
  itemsPerPage: number | 'all';
  onChangeItemsPerPage: (value: number | 'all') => void;
  onChangeSort: (value: string) => void;
};

export const CatalogControls = ({
  sort,
  itemsPerPage,
  onChangeItemsPerPage,
  onChangeSort,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-span-2 md:col-span-4 lg:col-span-4 text-left mb-[24px]">
        <label className="text-muted-foreground text-[12px] font-manrope font-medium mb-[3px]">
          {t('ui.sortBy')}
        </label>
        <Select
          value={sort}
          onValueChange={onChangeSort}
        >
          <SelectTrigger className="w-full h-[40px] rounded-[8px] border-border bg-card font-manrope text-foreground text-[14px] font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card text-card-foreground border-border">
            <SelectGroup>
              <SelectItem
                className="focus:bg-muted focus:text-foreground"
                value="newest"
              >
                {t('ui.date')}
              </SelectItem>
              <SelectItem
                className="focus:bg-muted focus:text-foreground"
                value="alphabetically"
              >
                {t('ui.name')}
              </SelectItem>
              <SelectItem
                className="focus:bg-muted focus:text-foreground"
                value="cheapest"
              >
                {t('ui.price')}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-2 md:col-span-3 lg:col-span-3 text-left mb-[24px]">
        <label className="text-muted-foreground text-[12px] font-manrope font-medium mb-[3px]">
          {t('ui.itemsOnPage')}
        </label>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            onChangeItemsPerPage(value === 'all' ? 'all' : Number(value));
          }}
        >
          <SelectTrigger className="w-full h-[40px] rounded-[8px] border-border bg-card font-manrope text-foreground text-[14px] font-bold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card text-card-foreground border-border">
            <SelectGroup>
              <SelectItem
                className="focus:bg-muted focus:text-foreground"
                value="all"
              >
                {t('ui.all')}
              </SelectItem>
              <SelectItem
                className="focus:bg-muted focus:text-foreground"
                value="4"
              >
                4
              </SelectItem>
              <SelectItem
                className="focus:bg-muted focus:text-foreground"
                value="8"
              >
                8
              </SelectItem>
              <SelectItem
                className="focus:bg-muted focus:text-foreground"
                value="16"
              >
                16
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

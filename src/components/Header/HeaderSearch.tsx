import { useLocation, useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchInput } from '../ui/input/SearchInput';
import { useTranslation } from 'react-i18next';

const CATEGORIES = [
  { label: 'categories.programming', value: 'programming' },
  { label: 'categories.psychology', value: 'psychology' },
  { label: 'categories.fantasy', value: 'fantasy' },
  { label: 'categories.drama', value: 'drama' },
  { label: 'categories.detective', value: 'detective' },
];

type Props = {
  isMobile?: boolean;
  onCategorySelect?: () => void;
  onClick?: () => void;
};

export const HeaderSearch = ({
  isMobile,
  onCategorySelect,
  onClick,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentCategory =
    location.pathname.startsWith('/category/') ?
      location.pathname.split('/')[2]
    : '';

  const handleCategoryChange = (value: string) => {
    navigate(`/category/${value}`);
    onCategorySelect?.();
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div
          onClick={onClick}
          className="cursor-pointer"
        >
          <SearchInput
            className="
          w-full
          h-[40px]
          px-4
          bg-input
          text-sm
          font-bold
          text-foreground
          leading-none
          placeholder:text-muted-foreground
          placeholder:opacity-100
          placeholder:font-bold
          focus-visible:outline-none
          "
            value=""
            placeholder={t('categories.findBookPlaceholder')}
            readOnly
          />
        </div>

        <Select
          value={currentCategory}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="flex items-center justify-between px-4 h-[40px] w-full border border-border rounded-md bg-input text-sm font-bold text-secondary">
            <SelectValue placeholder={t('categories.categories')} />
          </SelectTrigger>

          <SelectContent className="bg-input border border-border rounded-md shadow-lg py-2 w-full">
            <SelectGroup>
              {CATEGORIES.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                  className="px-4 py-2 text-sm cursor-pointer"
                >
                  {t(category.label)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="hidden lg:flex items-center gap-3 mr-6 h-full"
    >
      <SearchInput
        className="
          w-full
          h-[40px]
          px-4         
          bg-input
          text-sm
          font-bold
          text-foreground
          leading-none
          placeholder:text-muted-foreground
          placeholder:opacity-100
          placeholder:font-bold
          focus-visible:outline-none
          "
        value=""
        placeholder={t('categories.findBookPlaceholder')}
        readOnly
      />

      <Select
        value={currentCategory}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="flex items-center justify-between gap-3 px-4 h-[40px] w-[176px] border border-border rounded-md bg-input text-sm font-bold text-secondary whitespace-nowrap hover:border-ring">
          <SelectValue placeholder={t('categories.categories')} />
        </SelectTrigger>

        <SelectContent className="min-w-[180px] border border-border bg-input rounded-md shadow-lg py-2">
          <SelectGroup>
            {CATEGORIES.map((category) => (
              <SelectItem
                key={category.value}
                value={category.value}
                className="px-4 py-2 text-sm cursor-pointer"
              >
                {t(category.label)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

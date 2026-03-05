import { Command, CommandEmpty, CommandList } from '@/components/ui/Command';
import { SearchInput } from '@/components/ui/input/SearchInput';
import { useSearchBooks } from '../hooks/useSearchBooks';
import { useSearchActions } from '../hooks/useSearchAction';
import { SearchSections } from './SearchSections';
import {
  getSearchTranslations,
  type SearchDialogContentProps,
} from '../search.types';
import { useTranslation } from 'react-i18next';

export const SearchDialogContent = ({
  onClose,
  onSelect,
}: SearchDialogContentProps) => {
  const { t } = useTranslation();
  const { texts } = getSearchTranslations(t);

  const { searchTerm, setSearchTerm, results, groupedResults, loading } =
    useSearchBooks();

  const actions = useSearchActions(onClose, onSelect);

  return (
    <Command
      className="bg-background"
      shouldFilter={false}
    >
      <div className="flex items-center border-b border-gray-100 px-4 py-3">
        <SearchInput
          autoFocus
          value={searchTerm}
          placeholder={texts.placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <CommandList className="max-h-[550px] overflow-y-auto p-4 custom-scrollbar bg-background">
        {loading && (
          <div className="p-4 text-sm text-foreground animate-pulse flex items-center gap-2">
            {texts.searching}
          </div>
        )}

        <SearchSections
          groupedResults={groupedResults}
          searchTerm={searchTerm}
          actions={actions}
        />

        {!loading && results.length === 0 && searchTerm.trim() !== '' && (
          <CommandEmpty className="p-12 text-center text-foreground font-medium">
            {texts.noResults}
          </CommandEmpty>
        )}
      </CommandList>
    </Command>
  );
};

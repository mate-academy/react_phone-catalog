import { VisuallyHidden } from 'radix-ui';
import { SearchDialogContent } from './components/SearchDialogContent.tsx';
import { Dialog, DialogContent, DialogTitle } from '../../ui/Dialog.tsx';
import { useTranslation } from 'react-i18next';

interface GlobalSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const GlobalSearch = ({
  open,
  setOpen,
  onSelect,
}: GlobalSearchProps & { onSelect?: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent
          className="p-0 border-none bg-input shadow-2xl sm:max-w-[650px] top-[10%] translate-y-0 rounded-2xl overflow-hidden"
          showCloseButton={false}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <VisuallyHidden.Root>
            <DialogTitle>{t('ui.searchBooks')}</DialogTitle>
          </VisuallyHidden.Root>

          {open && (
            <SearchDialogContent
              onClose={() => setOpen(false)}
              onSelect={onSelect}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

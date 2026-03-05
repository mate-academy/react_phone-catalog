import { Loader2 } from 'lucide-react';
import type { DownloadInvoiceButtonProps } from '../types/invoice';
import {
  DOWNLOAD_BUTTON_CLASS,
  InvoiceButtonLabel,
} from '../constants/invoiceConfig';
import { useInvoicePreparation } from '../hooks/useInvoicePreparation';
import { useCurrency } from '@/context/CurrencyContext';
import { DownloadIcon } from './DownloadIcon';

export const DownloadInvoiceButton = ({
  order,
  className,
}: DownloadInvoiceButtonProps) => {
  const { currency, rate } = useCurrency();
  const { isGenerating, handleDownload } = useInvoicePreparation(order, {
    currency,
    rate,
  });

  const buttonClassName = className ?? DOWNLOAD_BUTTON_CLASS;

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className={buttonClassName}
    >
      {isGenerating ?
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {InvoiceButtonLabel.Generating}
        </>
      : <>
          <DownloadIcon />
          {InvoiceButtonLabel.Download}
        </>
      }
    </button>
  );
};

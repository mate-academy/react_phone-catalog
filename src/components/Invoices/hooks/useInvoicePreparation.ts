import { useState, createElement } from 'react';
import { pdf } from '@react-pdf/renderer';
import type { Order } from '@/types/Order';
import type { CurrencyInfo } from '../types/invoice';
import { imageToBase64 } from '../helpers/imageToBase64';
import { InvoicePDF } from '../components/InvoicePDF';

export const useInvoicePreparation = (
  order: Order,
  currencyInfo: CurrencyInfo,
) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const convertedItems = await Promise.all(
        order.items.map(async (item) => {
          const base64Images = await Promise.all(
            item.images.map(imageToBase64),
          );
          return { ...item, images: base64Images.filter(Boolean) };
        }),
      );

      const convertedOrder = { ...order, items: convertedItems };
      const element = createElement(InvoicePDF, {
        order: convertedOrder,
        currencyInfo,
      });

      const blob = await pdf(element).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${order.id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, handleDownload };
};

import { Text, View } from '@react-pdf/renderer';
import { invoiceStyles } from '../constants/invoiceStyles';
import {
  getCurrencySymbol,
  convertPrice,
} from '@/components/Orders/helpers/priceUtils';
import type { InvoiceTotalsProps } from '../types/invoice';

export const InvoiceTotals = ({
  subtotal,
  discount,
  total,
  currencyInfo,
}: InvoiceTotalsProps) => {
  const { currency, rate } = currencyInfo;
  const symbol = getCurrencySymbol(currency);
  const convertedSubtotal = convertPrice(subtotal, currency, rate);

  const hasDiscount = discount != null && discount > 0;
  const discountAmount = hasDiscount ? convertedSubtotal * (discount / 100) : 0;
  const adjustedTotal =
    hasDiscount ?
      convertedSubtotal - discountAmount
    : convertPrice(total, currency, rate);

  return (
    <View style={invoiceStyles.totalsSection}>
      <View style={invoiceStyles.totalRow}>
        <Text style={invoiceStyles.totalLabel}>Subtotal</Text>
        <Text style={invoiceStyles.totalValue}>
          {symbol}
          {convertedSubtotal.toFixed(2)}
        </Text>
      </View>
      {hasDiscount && (
        <View style={invoiceStyles.totalRow}>
          <Text style={invoiceStyles.totalLabel}>Discount ({discount}%)</Text>
          <Text style={{ ...invoiceStyles.totalValue, color: '#27AE60' }}>
            -{symbol}
            {discountAmount.toFixed(2)}
          </Text>
        </View>
      )}
      <View style={invoiceStyles.totalRow}>
        <Text style={invoiceStyles.totalLabel}>Shipping</Text>
        <Text style={invoiceStyles.totalValue}>—</Text>
      </View>
      <View style={invoiceStyles.totalDivider} />
      <View style={invoiceStyles.totalRow}>
        <Text style={invoiceStyles.grandLabel}>Total</Text>
        <Text style={invoiceStyles.grandValue}>
          {symbol}
          {adjustedTotal.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

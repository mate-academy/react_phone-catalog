import { Text, View } from '@react-pdf/renderer';
import { invoiceStyles } from '../constants/invoiceStyles';
import {
  DATE_LOCALE,
  DATE_FORMAT_OPTIONS,
  PAYMENT_METHOD_LABELS,
} from '../constants/invoiceConfig';
import { getStatusBadgeStyle } from '../helpers/getStatusBadgeStyle';
import type { InvoiceMetaSectionProps } from '../types/invoice';

export const InvoiceMetaSection = ({ order }: InvoiceMetaSectionProps) => {
  const badgeStyle = getStatusBadgeStyle(order.status);
  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    DATE_LOCALE,
    DATE_FORMAT_OPTIONS,
  );
  const paymentLabel =
    PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod;

  return (
    <View style={invoiceStyles.metaRow}>
      <View style={invoiceStyles.metaColumn}>
        <Text style={invoiceStyles.metaLabel}>DATE</Text>
        <Text style={invoiceStyles.metaValue}>{formattedDate}</Text>
      </View>
      <View style={invoiceStyles.metaColumn}>
        <Text style={invoiceStyles.metaLabel}>PAYMENT</Text>
        <Text style={invoiceStyles.metaValue}>{paymentLabel}</Text>
      </View>
      <View style={invoiceStyles.metaColumn}>
        <Text style={invoiceStyles.metaLabel}>STATUS</Text>
        <View style={[invoiceStyles.badge, badgeStyle.badge]}>
          <Text style={[invoiceStyles.badgeText, badgeStyle.text]}>
            {order.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );
};

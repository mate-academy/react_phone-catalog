import { Text, View } from '@react-pdf/renderer';
import { invoiceStyles } from '../constants/invoiceStyles';
import { COMPANY_NAME } from '../constants/invoiceConfig';
import type { InvoiceHeaderProps } from '../types/invoice';

export const InvoiceHeader = ({ orderId }: InvoiceHeaderProps) => (
  <View style={invoiceStyles.header}>
    <Text style={invoiceStyles.logo}>{COMPANY_NAME}</Text>
    <View style={invoiceStyles.headerRight}>
      <Text style={invoiceStyles.invoiceLabel}>INVOICE</Text>
      <Text style={invoiceStyles.invoiceId}>{orderId}</Text>
    </View>
  </View>
);

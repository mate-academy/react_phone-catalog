import { Text, View } from '@react-pdf/renderer';
import { invoiceStyles } from '../constants/invoiceStyles';
import type { InvoiceAddressesProps } from '../types/invoice';

export const InvoiceAddresses = ({ customer }: InvoiceAddressesProps) => {
  const fullName = `${customer.firstName} ${customer.lastName}`;

  return (
    <View style={invoiceStyles.addressesRow}>
      <View style={invoiceStyles.addressColumnLeft}>
        <Text style={invoiceStyles.metaLabel}>BILL TO</Text>
        <Text style={invoiceStyles.addressName}>{fullName}</Text>
        <Text style={invoiceStyles.addressDetail}>{customer.email}</Text>
        <Text style={invoiceStyles.addressDetailLast}>{customer.phone}</Text>
      </View>

      <View style={invoiceStyles.verticalDivider} />

      <View style={invoiceStyles.addressColumnRight}>
        <Text style={invoiceStyles.metaLabel}>SHIP TO</Text>
        <Text style={invoiceStyles.addressName}>{fullName}</Text>
        <Text style={invoiceStyles.addressDetail}>{customer.address}</Text>
        <Text style={invoiceStyles.addressDetail}>
          {customer.city}, {customer.zip}
        </Text>
        <Text style={invoiceStyles.addressDetailLast}>{customer.country}</Text>
      </View>
    </View>
  );
};

import { Text, View, Image } from '@react-pdf/renderer';
import { invoiceStyles } from '../constants/invoiceStyles';
import { getItemPrice } from '@/helpers/getItemPrice';
import { getCurrencySymbol } from '@/components/Orders/helpers/priceUtils';
import type { InvoiceItemsTableProps } from '../types/invoice';

export const InvoiceItemsTable = ({
  items,
  currencyInfo,
}: InvoiceItemsTableProps) => {
  const { currency, rate } = currencyInfo;
  const symbol = getCurrencySymbol(currency);

  return (
    <>
      <View style={invoiceStyles.tableHeader}>
        <View style={invoiceStyles.columnImage} />
        <View style={invoiceStyles.columnItem}>
          <Text style={invoiceStyles.tableHeaderText}>ITEM</Text>
        </View>
        <View style={invoiceStyles.columnQuantity}>
          <Text style={invoiceStyles.tableHeaderText}>QUANTITY</Text>
        </View>
        <View style={invoiceStyles.columnPrice}>
          <Text style={invoiceStyles.tableHeaderText}>PRICE</Text>
        </View>
        <View style={invoiceStyles.columnTotal}>
          <Text style={invoiceStyles.tableHeaderText}>TOTAL</Text>
        </View>
      </View>

      {items.map((item) => {
        const price = getItemPrice(item, currency, rate);
        const lineTotal = price * item.quantity;

        return (
          <View
            key={item.id}
            style={invoiceStyles.tableRow}
          >
            <View style={invoiceStyles.columnImage}>
              {item.images?.[0] && (
                <Image
                  src={item.images[0]}
                  style={invoiceStyles.bookImage}
                />
              )}
            </View>
            <View style={invoiceStyles.columnItem}>
              <Text style={invoiceStyles.cellTitle}>{item.name}</Text>
              <Text style={invoiceStyles.cellAuthor}>
                {item.author} · {item.type}
              </Text>
            </View>
            <View style={invoiceStyles.columnQuantity}>
              <Text style={invoiceStyles.cellText}>{item.quantity}</Text>
            </View>
            <View style={invoiceStyles.columnPrice}>
              <Text style={invoiceStyles.cellText}>
                {symbol}
                {price.toFixed(2)}
              </Text>
            </View>
            <View style={invoiceStyles.columnTotal}>
              <Text style={invoiceStyles.cellTextBold}>
                {symbol}
                {lineTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
};

import { Text, View } from '@react-pdf/renderer';
import { invoiceStyles } from '../constants/invoiceStyles';
import {
  COMPANY_NAME,
  COMPANY_WEBSITE,
  DATE_LOCALE,
} from '../constants/invoiceConfig';

export const InvoiceFooter = () => {
  const generatedDate = new Date().toLocaleDateString(DATE_LOCALE);

  return (
    <View style={invoiceStyles.footer}>
      <Text style={invoiceStyles.footerText}>
        {COMPANY_NAME} · {COMPANY_WEBSITE}
      </Text>
      <Text style={invoiceStyles.footerText}>Generated {generatedDate}</Text>
    </View>
  );
};

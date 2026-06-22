import './globals.css';

import { Metadata } from 'next';

import { GlobalChatWidget } from '@/features/GlobalChatWidget/ui/GlobalChatWidget';
import { mont } from '@/shared/config';
import { ThemeProvider } from '@/shared/providers';
import { CurrencyRatesProvider } from '@/shared/ui/CurrencyRatesProvider';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

export const metadata: Metadata = {
  title: {
    default: 'Nice Gadgets',
    template: '%s | Nice Gadgets',
  },
};

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={mont.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased flex flex-col pt-11.75 lg:pt-16">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
        >
          <Header />
          <div className="flex-1 w-full">
            <CurrencyRatesProvider>{children}</CurrencyRatesProvider>
          </div>
          <Footer />
          <GlobalChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

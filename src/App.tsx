import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';
import { Providers } from './components/Providers';
import { UnicornAssistant } from './components/UnicornAssistant';
import { unicornMessages } from './i18n/unicornMessages';
//import { useLanguage } from './context/language/useLanguage';
//import { useLanguage } from './context/language/LanguageContext';

export const App = () => {
  //const { currentLanguage } = useLanguage();
  return (
    <Providers>
      <div className="App dark:bg-dark-background dark:text-dark-primary">
        <div className="wrapper min-h-screen flex flex-col">
          <Header />
          <main className="grow max-w-[1200px] w-full mx-auto mobile:px-4 tablet:px-6 desktop:px-8">
            <Outlet />
          </main>
          <Footer />
        </div>

        <UnicornAssistant
          messages={unicornMessages}
          interval={5000}
          //currentLanguage={currentLanguage}
        />
      </div>
    </Providers>
  );
};

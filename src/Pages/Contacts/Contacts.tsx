import { AuthorsList } from '../../Components/AuthorsList';
import { UrlWay } from '../../Components/UrlWay';
import { useTranslationState } from '../../stateManagers/languageState';
import './Contacts.scss';

export const Contacts = () => {
  const { translate } = useTranslationState();

  return (
    <section className="contacts">
      <UrlWay category={translate('contacts')} />

      <h1 className="contacts__title">{translate('Our team')}</h1>

      <AuthorsList />
    </section>
  );
};

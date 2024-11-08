import { ILanguages } from './languages';

export const initialFlag = (languages: ILanguages[], language: string) =>
  languages.find(lang => lang.code === language)?.flag || '';

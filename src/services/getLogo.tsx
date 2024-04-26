import { BASE_URL, LOGO_URL } from "../modules/constants/URL's/URL's";

export function getLogo() {
  return { logo: `${BASE_URL}${LOGO_URL}` };
}

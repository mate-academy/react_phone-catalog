import { ErrorText } from '../../constants/errorText';
import { Error } from '../../components/Error';

export const NotFound = () => <Error errorText={ErrorText.noPage} />;

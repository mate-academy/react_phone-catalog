import { useParams } from 'react-router-dom';
import { Params } from '../../definitions/enums/Router';

export const useAppParams = () => useParams() as Params;

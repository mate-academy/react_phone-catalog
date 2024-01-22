import { useParams } from 'react-router-dom';
import { Params } from '../constants/Router';

export const useAppParams = () => useParams() as Params;

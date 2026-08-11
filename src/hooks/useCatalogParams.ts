
import { useSearchParams } from "react-router-dom";

export const useCatalogParams =()=>{
    const [searchParams ,setUseSearhParams] = useSearchParams();

    const sortBy = searchParams.get('sort') || 'age';
    const perPage = searchParams.get('perPage') || 'all';
    const page = parseInt(searchParams.get('page') || '1' ,10);

    const changeParam = (key : string, value: string) => {
     const params = new URLSearchParams(searchParams);
       params.set(key,value); 

       if(key !== 'page'){
        params.delete('page');
       }
       if (params.get('page') === '1')params.delete('page');
       if(params.get('perPage')==='all') params.delete('perPage');

       setUseSearhParams(params);
    };

    return {sortBy,perPage,page,changeParam};
}
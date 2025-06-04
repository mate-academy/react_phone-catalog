import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks"

import { setStatus } from "../../features/FilterSlice";

export const Filter = () => {
  const dispatch = useDispatch();
  const { status } = useAppSelector(state => state.filter);
  const handleStatusChange = (event) => {
    dispatch(setStatus(event.target.value as 'newest' | 'alphabetically' | 'cheapest'));
}
  return (<>
  <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
onChange={handleStatusChange}
          >
            <option value={'newest'}>Newest</option>
            <option value={'alphabetically'}>Alphabetically</option>
            <option value={'cheapest'}>Cheapest</option>
          </select>
        </span>
      </p></>)
}

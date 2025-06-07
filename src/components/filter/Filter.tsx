
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import { setStatus } from "../../features/FilterSlice";


export const Filter = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.filter.status);
  const handleStatusChange = (event) => {
    dispatch(setStatus(event.target.value as 'newest' | 'alphabetically' | 'cheapest'));
}
  return (<>
  <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >Sort by
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
      </p>

    </form>
   </>)
}



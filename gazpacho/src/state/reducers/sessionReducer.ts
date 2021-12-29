import { ISession } from '../../types/SessionTypes';
import { toIsoDateWithoutHypens } from '../../utils/dateUtils';

const defaultState: Record<string, ISession[]> = {};

export type SessionAction = {
  type: 'ADD_SESSION';
  payload: ISession;
};
type defaultAction = {
  type: '';
};

export default function sessionReducer(
  state: Record<string, ISession[]> = defaultState,
  action: SessionAction | defaultAction = { type: '' },
) {
  let key = '';
  switch (action.type) {
    case 'ADD_SESSION':
      key = toIsoDateWithoutHypens(action?.payload?.day);
      return {
        ...state,
        [key]: [...(state[key] || []), action.payload],
      };
    default:
      return state;
  }
}

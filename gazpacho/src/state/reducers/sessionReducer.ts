import { ISession } from "../../types/SessionTypes";
import { toIsoDateWithoutHypens } from "../../utils/dateUtils";

const defaultState: Record<string, ISession[]> = {};

export type SessionAction = {
  type: "ADD_SESSION";
  payload: ISession;
};
export default function sessionReducer(
  state: Record<string, ISession[]> = defaultState,
  action: SessionAction
) {
  switch (action.type) {
    case "ADD_SESSION":
      const key = toIsoDateWithoutHypens(action.payload.day);
      return {
        ...state,
        [key]: [...(state[key] || []), action.payload],
      };
    default:
      return state;
  }
}

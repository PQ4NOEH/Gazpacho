import { ISession } from '../../types/SessionTypes'
import { SessionAction } from '../reducers/sessionReducer'

const sessionActions = Object.freeze({
    AddSession: (session: ISession): SessionAction => {
        return {
            type: 'ADD_SESSION',
            payload: session,
        }
    },
})
export default sessionActions

import { ISession } from './SessionTypes'

export default interface RootState {
    sessionReducer: Record<string, ISession[]>
}

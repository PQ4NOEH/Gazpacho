import { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import RootState from '../../types/rootState'
import { ISession } from '../../types/SessionTypes'
import { toIsoDate, toIsoDateWithoutHypens } from '../../utils/dateUtils'
import SessionSummaryItem from './SessionSummaryItem'

export default function SessionsSummary() {
    const [sessionsDay, setSessionsDay] = useState(toIsoDate(new Date()))
    const sessions = useSelector<RootState, Record<string, ISession[]>>(
        (state) => state.sessionReducer
    )

    function handleSessionsDayChange(e: ChangeEvent<HTMLInputElement>) {
        setSessionsDay(e.target.value)
    }
    function currentDaySessions(): ISession[] {
        const key = toIsoDateWithoutHypens(new Date(sessionsDay))
        return sessions[key] || []
    }
    function handleViewSessionDetail(session: ISession) {}
    function handleAddSessionShift(session: ISession) {}
    return (
        <div>
            <input
                type="date"
                value={sessionsDay}
                onChange={handleSessionsDayChange}
                aria-label="sessions day"
            />
            <ul>
                {currentDaySessions().map((s) => {
                    return (
                        <SessionSummaryItem
                            key={s.id}
                            item={s}
                            onViewDetail={handleViewSessionDetail}
                            onAddShift={handleAddSessionShift}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

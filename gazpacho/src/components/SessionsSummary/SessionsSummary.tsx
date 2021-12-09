import { ChangeEvent, useState } from 'react';
import { ISession } from '../../types/SessionTypes';
import { toIsoDate } from '../../utils/dateUtils';
import { generateGuid } from '../../utils/guidUtils';
import SessionSummaryItem from './SessionSummaryItem';

export default function SessionsSummary() {
    const [sessionsDay, setSessionsDay] = useState(toIsoDate(new Date()));
    const dataMock: ISession[] = [
        { id: generateGuid(), clientName: "Tracasa", day: new Date(), goals: [] },
        { id: generateGuid(), clientName: "VW", day: new Date(), goals: [] },
        { id: generateGuid(), clientName: "Elektra", day: new Date(), goals: [] },
    ]
    function handleSessionsDayChange(e: ChangeEvent<HTMLInputElement>) {
        setSessionsDay(e.target.value)
    }
    function handleViewSessionDetail(session: ISession) {
    }
    function handleAddSessionShift(session: ISession) {

    }
    return (
        <div>
            <input
                type="date"
                value={sessionsDay}
                onChange={handleSessionsDayChange}
                aria-label="sessions day"
            />
            <ul>
                {
                    dataMock.map(s => {
                        return <SessionSummaryItem
                            key={s.id}
                            item={s}
                            onViewDetail={handleViewSessionDetail}
                            onAddShift={handleAddSessionShift}
                        />
                    })}
            </ul>
        </div>
    )
}

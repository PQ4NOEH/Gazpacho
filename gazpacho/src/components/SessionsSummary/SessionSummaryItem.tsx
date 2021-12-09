import { ISession } from '../../types/SessionTypes';

type SessionSummaryItemProps = {
    item: ISession;
    onViewDetail: (item: ISession) => void;
    onAddShift: (item: ISession) => void;
}

export default function SessionSummaryItem({
    item,
    onViewDetail,
    onAddShift
}: SessionSummaryItemProps) {
    const handleViewDetail = () => onViewDetail(item);
    const handleAddShift = () => onAddShift(item);
    return (
        <li>
            <span>{item.clientName}</span>
            <button
                aria-label="view session detail"
                onClick={handleViewDetail}
            >
                View
            </button>
            <button
                aria-label="add shift"
                onClick={handleAddShift}
            >
                Add
            </button>
        </li>
    )
}

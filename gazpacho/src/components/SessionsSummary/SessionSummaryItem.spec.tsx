import { fireEvent, render, screen } from '@testing-library/react'
import { ISession } from '../../types/SessionTypes'
import SessionSummaryItem from './SessionSummaryItem'

describe('SessionSummaryItem', () => {
    const sessionItem: ISession = {
        id: '1',
        clientName: 'client name',
        day: new Date(),
        goals: [],
    }
    it('Should render', () => {
        render(
            <SessionSummaryItem
                item={sessionItem}
                onAddShift={jest.fn()}
                onViewDetail={jest.fn()}
            />
        )
        expect(screen.getByRole('listitem')).toBeInTheDocument()
        expect(screen.getByText(sessionItem.clientName)).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'view session detail' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'add shift' })
        ).toBeInTheDocument()
    })

    it('Should trigger view detail', () => {
        const handleViewDetail = jest.fn()
        render(
            <SessionSummaryItem
                item={sessionItem}
                onAddShift={jest.fn()}
                onViewDetail={handleViewDetail}
            />
        )
        fireEvent.click(
            screen.getByRole('button', { name: 'view session detail' })
        )
        expect(handleViewDetail).toHaveBeenCalledTimes(1)
        expect(handleViewDetail.mock.calls[0][0]).toEqual(sessionItem)
    })

    it('Should trigger add shift', () => {
        const handleAddShift = jest.fn()
        render(
            <SessionSummaryItem
                item={sessionItem}
                onAddShift={handleAddShift}
                onViewDetail={jest.fn()}
            />
        )
        fireEvent.click(screen.getByRole('button', { name: 'add shift' }))
        expect(handleAddShift).toHaveBeenCalledTimes(1)
        expect(handleAddShift.mock.calls[0][0]).toEqual(sessionItem)
    })
})

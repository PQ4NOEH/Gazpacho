import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { randomString } from '../../utils/stringUtils'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import CreateSession from './CreateSession'

const mockStore = configureStore([])
describe('Session goals', () => {
    let store
    let container //: HTMLElement;
    beforeEach(() => {
        store = mockStore({
            myState: 'sample text',
        })
        const component = render(
            <Provider store={store}>
                <CreateSession />
            </Provider>
        )
        container = component.container
    })
    it('renders the Session', () => {
        expect(
            container.querySelector("input[type='date']")
        ).toBeInTheDocument()
        const clientNameInput = screen.getByRole('textbox', {
            name: 'client name',
        })
        expect(clientNameInput).toBeInTheDocument()
        expect(clientNameInput).toHaveFocus()
        expect(
            screen.getByRole('button', { name: 'create session' })
        ).toBeInTheDocument()
    })
    it('validate empty client name', async () => {
        fireEvent.submit(screen.getByRole('button', { name: 'create session' }))
        const clientNameError = await waitFor(() =>
            screen.getByRole('alert', { name: 'client name error' })
        )
        expect(clientNameError.innerHTML).toEqual('Client name is required')
    })
    it('validate client name shorter than 3 characters', async () => {
        fireEvent.input(screen.getByRole('textbox', { name: 'client name' }), {
            target: { value: randomString(1) },
        })
        fireEvent.submit(screen.getByRole('button', { name: 'create session' }))
        const clientNameError = await waitFor(() =>
            screen.getByRole('alert', { name: 'client name error' })
        )
        expect(clientNameError.innerHTML).toEqual(
            'Client name must have more than 2 characters'
        )
    })
    it('validate client name longer than 50 characters', async () => {
        fireEvent.input(screen.getByRole('textbox', { name: 'client name' }), {
            target: { value: randomString(51) },
        })
        fireEvent.submit(screen.getByRole('button', { name: 'create session' }))
        const clientNameError = await waitFor(() =>
            screen.getByRole('alert', { name: 'client name error' })
        )
        expect(clientNameError.innerHTML).toEqual(
            'Client name can not have more than 50 characters'
        )
    })
})

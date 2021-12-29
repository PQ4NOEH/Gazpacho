import sessionReducer from './sessionReducer'
import { generateGuid } from '../../utils/guidUtils'
import { randomString } from '../../utils/stringUtils'
import { toIsoDateWithoutHypens } from '../../utils/dateUtils'

describe('sessionReducer', () => {
    function generateNewSessionObject() {
        return {
            id: generateGuid(),
            day: new Date(),
            clientName: randomString(10),
            goals: [randomString(5), randomString(3)],
        }
    }
    it('Default state is an empty object', () => {
        const state = sessionReducer(undefined, {})
        expect(Object.keys(state)).toHaveLength(0)
    })

    it('Add new session objects', () => {
        const newSession = generateNewSessionObject()
        const actual = sessionReducer(undefined, {
            type: 'ADD_SESSION',
            payload: newSession,
        })
        const expected = {
            [toIsoDateWithoutHypens(newSession.day)]: [newSession],
        }
        expect(actual).toEqual(expected)
    })

    it('appends new session objects', () => {
        const dateKey = toIsoDateWithoutHypens(new Date())
        const newSession = generateNewSessionObject()
        const oldSessionObject = generateNewSessionObject()
        const state = {
            [dateKey]: [oldSessionObject],
        }
        const actual = sessionReducer(state, {
            type: 'ADD_SESSION',
            payload: newSession,
        })

        expect(Object.keys(actual)).toHaveLength(1)
        expect(actual[dateKey]).toEqual(
            expect.arrayContaining([newSession, oldSessionObject])
        )
    })
})

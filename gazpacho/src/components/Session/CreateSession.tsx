import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SessionGoals } from './SessionGoals'
import { ISession } from '../../types/SessionTypes'
import { generateGuid } from '../../utils/guidUtils'
import { toIsoDate } from '../../utils/dateUtils'
import { useDispatch } from 'react-redux'
import sessionActions from '../../state/actions/SessionActions'
import ErrorMessage from '../common/ErrorMessage'
import Fieldset from '../common/Fieldset'

function CreateSession() {
    const dispatch = useDispatch()
    const [state, setState] = useState<ISession>({
        id: generateGuid(),
        day: new Date(),
        clientName: '',
        goals: [],
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onsubmit = (data: any) => {
        const action = sessionActions.AddSession({
            ...state,
            clientName: data.clientName,
        })
        dispatch(action)
    }

    function handleGoalsChange(goals: string[]) {
        setState({ ...state, goals })
    }

    return (
        <div>
            <h2 className="text-rose-600 text-2xl">New session</h2>
            <form onSubmit={handleSubmit(onsubmit)}>
                <Fieldset legend="Date">
                    <input
                        type="date"
                        disabled
                        value={toIsoDate(state.day)}
                        aria-label="session date"
                    />
                </Fieldset>
                <Fieldset legend="Client Name">
                    <input
                        id="clientName"
                        type="text"
                        {...register('clientName', {
                            required: true,
                            maxLength: 50,
                            minLength: 3,
                        })}
                        aria-label="client name"
                        autoFocus
                    />
                    {errors.clientName?.type === 'required' && (
                        <ErrorMessage
                            ariaDescribedby="clientName"
                            ariaLabel="client name error"
                            message="Client name is required"
                        />
                    )}
                    {errors.clientName?.type === 'maxLength' && (
                        <ErrorMessage
                            ariaDescribedby="clientName"
                            ariaLabel="client name error"
                            message="Client name can not have more than 50 characters"
                        />
                    )}
                    {errors.clientName?.type === 'minLength' && (
                        <ErrorMessage
                            ariaDescribedby="clientName"
                            ariaLabel="client name error"
                            message="Client name must have more than 2 characters"
                        />
                    )}
                </Fieldset>

                <SessionGoals
                    goals={state.goals}
                    onChange={handleGoalsChange}
                />

                <input
                    type="submit"
                    value="create session"
                    arial-label="Create session"
                />
            </form>
        </div>
    )
}

export default CreateSession

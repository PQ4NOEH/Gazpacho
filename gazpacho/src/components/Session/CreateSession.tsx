import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { SessionGoals } from './SessionGoals';
import { ISession } from '../../types/SessionTypes';
import { generateGuid } from '../../utils/guidUtils';
import { toIsoDate } from '../../utils/dateUtils';


function CreateSession() {
    const [state, setState] = useState<ISession>({ id: generateGuid(), day: new Date(), clientName: "", goals: [] });
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onsubmit = (data: any) => console.log(data);

    function handleGoalsChange(goals: string[]) {
        setState({ ...state, goals });
    }

    return (
        <div>
            <h2>New session</h2>
            <form onSubmit={handleSubmit(onsubmit)}>
                <fieldset>
                    <legend>Date</legend>
                    <input
                        type="date"
                        disabled
                        value={toIsoDate(state.day)}
                        aria-label="session date"
                    />
                </fieldset>
                <fieldset>
                    <legend>Client Name</legend>
                    <input
                        id="clientName"
                        type="text"
                        {
                        ...register("clientName", { required: true, maxLength: 50, minLength: 3 })
                        }
                        aria-label="client name"
                        autoFocus
                    />
                    {
                        errors.clientName?.type === "required" &&
                        <p
                            aria-describedby="clientName"
                            aria-label="client name error"
                            role="alert">
                            Client name is required
                        </p>
                    }
                    {
                        errors.clientName?.type === "maxLength" &&
                        <p
                            aria-describedby="clientName"
                            aria-label="client name error"
                            role="alert">
                            Client name can not have more than 50 characters
                        </p>
                    }
                    {
                        errors.clientName?.type === "minLength" &&
                        <p
                            aria-describedby="clientName"
                            aria-label="client name error"
                            role="alert">
                            Client name must have more than 2 characters
                        </p>
                    }
                </fieldset>

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
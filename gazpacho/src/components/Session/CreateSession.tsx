import { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form'
import { SessionGoals } from './SessionGoals';
import { ISession } from './SessionTypes';


function CreateSession() {
    const [state, setState] = useState<ISession>({ day: new Date(), clientName: "", goals: [] });
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onsubmit = (data: any) => console.log(data);

    function handleGoalsChange(goals: string[]) {
        setState({ ...state, goals });
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <input
                    type="date"
                    disabled
                    value={state.day.getUTCDate()}
                    aria-label="session date"
                />
            </fieldset>
            <fieldset>
                <input
                    type="text"
                    {
                    ...register("clientName", { required: true, maxLength: 50, minLength: 3 })
                    }
                    aria-label="client name"
                />
                {errors.exampleRequired && <span>This field is required</span>}
            </fieldset>
            <SessionGoals goals={state.goals} onChange={handleGoalsChange} />

            <input type="submit" value="create session" arial-label="Create session" />
        </form>
    )
}

export default CreateSession
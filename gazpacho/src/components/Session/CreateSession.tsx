import { useState, ChangeEvent } from 'react';
import { SessionGoals } from './SessionGoals';
import { ISession } from './SessionTypes';


function CreateSession() {
    const [state, setState] = useState<ISession>({ day: new Date(), clientName: "", goals: [] });
    function handleClientNameChange(propName: string) {
        return (e: ChangeEvent<HTMLInputElement>) => {
            setState({ ...state, [propName]: e.currentTarget.value });
        }
    }
    function handleGoalsChange(goals: string[]) {
        setState({ ...state, goals });
    }

    return (
        <form>
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
                    id="client"
                    type="text"
                    value={state.clientName}
                    onChange={handleClientNameChange("clientName")}
                    minLength={3}
                    maxLength={50}
                    aria-label="client name"
                />
            </fieldset>
            <SessionGoals goals={state.goals} onChange={handleGoalsChange} />

            <input type="submit" value="create session" arial-label="Create session" />
        </form>
    )
}

export default CreateSession
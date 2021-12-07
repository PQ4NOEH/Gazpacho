import { useState, useEffect, ChangeEvent } from 'react';
import { GenerateHashCode } from '../../utils/stringUtils';

interface SessionGoalsProps {
    goals: string[],
    onChange: (goals: string[]) => void
}
interface KeyValue {
    key: number,
    value: string
}

function MapGoalsToKeyValue(goals: string[]): KeyValue[] {
    return goals.map(goal => {
        return {
            key: GenerateHashCode(goal),
            value: goal
        }
    });
}

export function SessionGoals({ goals, onChange }: SessionGoalsProps) {
    const [state, setState] = useState<KeyValue[]>(MapGoalsToKeyValue(goals));
    const [newGoal, setNewGoal] = useState<string>("");
    function handleNewGoalChange(e: ChangeEvent<HTMLInputElement>) {
        setNewGoal(e.currentTarget.value);
    }
    useEffect(() => {
        setState(MapGoalsToKeyValue(goals));
    }, [goals])
    function handleAddGoal() {
        const goals = [...state.map(kv => kv.value), newGoal];
        onChange(goals);
    }
    function handleDeleteGoal(item: KeyValue) {
        const goals = state.map(kv => kv.value).filter(g => g !== item.value);
        onChange(goals);
    }

    return (
        <fieldset>
            <input
                type="text"
                value={newGoal}
                onChange={handleNewGoalChange}
                minLength={3}
                maxLength={50}
                aria-label="new goal text"
            />
            <button
                id="addNewGoal"
                value="Add"
                aria-label="add goal"
                onClick={handleAddGoal}
            />
            <div>
                {
                    state.map(kv => {
                        return (
                            <div key={kv.key}>
                                <label>{kv.value}</label>
                                <input type="button" onClick={() => handleDeleteGoal(kv)} aria-label="remove goal" />
                            </div>
                        )
                    })
                }
            </div>


        </fieldset>
    )
}
import { useState, useEffect, ChangeEvent, useRef, MouseEventHandler } from 'react';
import { generateHashCode } from '../../utils/stringUtils';

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
            key: generateHashCode(goal),
            value: goal
        }
    });
}

export function SessionGoals({ goals, onChange }: SessionGoalsProps) {
    const newGoalRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState<KeyValue[]>(MapGoalsToKeyValue(goals));
    const [newStateError, setNewStateError] = useState({ minLength: false, maxLength: false });
    const [newGoal, setNewGoal] = useState<string>("");
    function handleNewGoalChange(e: ChangeEvent<HTMLInputElement>) {
        setNewGoal(e.currentTarget.value);
        e.stopPropagation();
    }
    useEffect(() => {
        setState(MapGoalsToKeyValue(goals));
    }, [goals])
    function handleAddGoal(e: React.MouseEvent<HTMLElement>) {
        if (newGoal.length < 3) {
            setNewStateError({ minLength: true, maxLength: false });
        } else if (newGoal.length > 50) {
            setNewStateError({ minLength: false, maxLength: true });
        } else {
            const goals = [...state.map(kv => kv.value), newGoal];
            setNewGoal("");
            setNewStateError({ minLength: false, maxLength: false });
            onChange(goals);
            newGoalRef.current?.focus();
        }
        e.stopPropagation();
        e.preventDefault();
    }
    function handleDeleteGoal(item: KeyValue) {
        const goals = state.map(kv => kv.value).filter(g => g !== item.value);
        onChange(goals);
    }

    return (
        <fieldset>
            <legend>Session goals</legend>
            <input
                type="text"
                id="newGoal"
                value={newGoal}
                onChange={handleNewGoalChange}
                minLength={3}
                maxLength={50}
                aria-label="new goal text"
                ref={newGoalRef}
            />
            <button
                value="Add"
                aria-label="add goal"
                onClick={handleAddGoal}
            />
            {newStateError.minLength && <p aria-describedby="newGoal" aria-label="new goal error" role="alert">New goal must have more than two characters</p>}
            {newStateError.maxLength && <p aria-describedby="newGoal" aria-label="new goal error" role="alert">New goal must have less than fifty characters</p>}
            <ul aria-label="session goals">
                {
                    state.map(kv => {
                        return (
                            <li key={kv.key}>
                                <span>{kv.value}</span>
                                <input type="button" onClick={() => handleDeleteGoal(kv)} aria-label="remove goal" />
                            </li>
                        )
                    })
                }
            </ul>


        </fieldset>
    )
}
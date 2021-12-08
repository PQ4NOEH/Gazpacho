import { fireEvent, logRoles, render, screen, waitFor } from "@testing-library/react"
import { SessionGoals } from "./SessionGoals"

const initialData: string[] = [];

describe("Session goals", () => {
    it("should render", () => {
        const handleOnChange = jest.fn();
        render(<SessionGoals goals={initialData} onChange={handleOnChange} />)
        expect(screen.getByRole("textbox", { name: "new goal text" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "add goal" })).toBeInTheDocument();
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
    it("Should add new goals", async () => {
        const handleOnChange = jest.fn();
        render(<SessionGoals goals={initialData} onChange={handleOnChange} />);
        fireEvent.input(
            screen.getByRole("textbox", { name: "new goal text" }),
            {
                target: {
                    value: "A new goal"
                }
            }
        );

        fireEvent.click(screen.getByRole("button"));
        await waitFor(() => expect(handleOnChange).toHaveBeenCalledTimes(1));
        const goals = handleOnChange.mock.calls[0][0];
        expect(goals).toHaveLength(1);
        expect(goals[0]).toEqual("A new goal");
    })
});
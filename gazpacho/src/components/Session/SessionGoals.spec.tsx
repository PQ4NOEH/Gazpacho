import { fireEvent, logRoles, render, screen, waitFor } from "@testing-library/react"
import { randomString } from "../../utils/stringUtils";
import { SessionGoals } from "./SessionGoals"



describe("Session goals", () => {
    it("should render", () => {
        const initialData: string[] = [];
        const handleOnChange = jest.fn();
        render(<SessionGoals goals={initialData} onChange={handleOnChange} />)
        expect(screen.getByRole("textbox", { name: "new goal text" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "add goal" })).toBeInTheDocument();
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
    it("Should add new goals", async () => {
        const initialData: string[] = [];
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
        expect(screen.getByRole("textbox", { name: "new goal text" })).toHaveFocus();
    });
    it("Should take away goals", async () => {
        const initialData = [
            "first goal",
            "second goal",
            "third goal"
        ];
        const handleOnChange = jest.fn();
        render(<SessionGoals goals={initialData} onChange={handleOnChange} />);

        const removeButtons = screen.getAllByRole("button", { name: "remove goal" });
        fireEvent.click(removeButtons[1]);

        await waitFor(() => expect(handleOnChange).toHaveBeenCalledTimes(1));
        const goals = handleOnChange.mock.calls[0][0];
        expect(goals).toHaveLength(2);
        expect(goals).toEqual([
            "first goal",
            "third goal"
        ]);
    });
    it("Should not add empty goals", async () => {
        const initialData: string[] = [];
        const handleOnChange = jest.fn();
        render(<SessionGoals goals={initialData} onChange={handleOnChange} />);
        fireEvent.click(screen.getByRole("button"));
        await waitFor(() => expect(handleOnChange).not.toHaveBeenCalled());
        const clientNameError = await waitFor(() => screen.getByRole("alert", { name: "new goal error" }));
        expect(clientNameError.innerHTML).toEqual("New goal must have more than two characters");
    })

    it("Should not add goals with more than fifty characters", async () => {
        const initialData: string[] = [];
        const handleOnChange = jest.fn();
        render(<SessionGoals goals={initialData} onChange={handleOnChange} />);
        fireEvent.input(
            screen.getByRole("textbox", { name: "new goal text" }),
            {
                target: {
                    value: randomString(51)
                }
            }
        );
        fireEvent.click(screen.getByRole("button"));
        await waitFor(() => expect(handleOnChange).not.toHaveBeenCalled());
        const clientNameError = await waitFor(() => screen.getByRole("alert", { name: "new goal error" }));
        expect(clientNameError.innerHTML).toEqual("New goal must have less than fifty characters");
    })
});
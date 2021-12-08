import { render, screen } from "@testing-library/react"
import { SessionGoals } from "./SessionGoals"

const initialData: string[] = [];
const handleOnChange = (goals: string[]) => { };

describe("Session goals", () => {
    it("should render", () => {
        render(<SessionGoals goals={initialData} onChange={handleOnChange} />)
        expect(screen.getByRole("button", { name: "add goal" })).toBeInTheDocument();
    });
});
import { render, screen } from "@testing-library/react"
import { SessionGoals } from "./SessionGoals"

const initialData: string[] = [];
const handleOnChange = (goals: string[]) => { };
it("should be render", () => {
    render(<SessionGoals goals={initialData} onChange={handleOnChange} />)

    expect(screen.getByRole("button", { name: "add goal" })).toBeInTheDocument();
})
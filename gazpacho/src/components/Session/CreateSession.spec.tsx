import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import CreateSession from './CreateSession';

let container: HTMLDivElement | null = null;

it("renders the Session", () => {
    const { container } = render(<CreateSession />);
    expect(container.querySelector("input[type='date']")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "client name" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "create session" })).toBeInTheDocument();
    expect(screen.getByRole("alert", { name: "client name error" })).not.toBeInTheDocument();
});
interface testTextInputValidationProps {
    value: string;
    errorMessage: string;
    textBoxAriaName: string;
    alertAriaName: string;
}
function testTextInputValidation({
    value,
    errorMessage,
    textBoxAriaName,
    alertAriaName
}: testTextInputValidationProps) {
    if (value.length > 0) {
        fireEvent.input(
            screen.getByRole("textbox", { name: textBoxAriaName }),
            { target: { value: value } });
    }

    fireEvent.submit(screen.getByRole("button", { name: "create session" }))
    const clientNameError = screen.getByRole("alert", { name: alertAriaName });
    expect(clientNameError).toBeInTheDocument();
    expect(clientNameError.innerText).toEqual(errorMessage);
}
it("validate client name", () => {
    render(<CreateSession />);
    fireEvent.submit(screen.getByRole("button", { name: "create session" }))
    const clientNameError = screen.getByRole("alert", { name: "client name error" });
    expect(clientNameError).toBeInTheDocument();
    expect(clientNameError.innerText).toEqual("Client name is required");
    // testTextInputValidation({
    //     value: "",
    //     errorMessage: "Client name is required",
    //     textBoxAriaName: "client name",
    //     alertAriaName: "client name error"
    // });
    // const clientNameInvalidCases = [
    //     { value: "", errorMessage: "Client name is required" },
    //     { value: "q", errorMessage: "Client name can not have more than 50 characters" },
    //     { value: "ssssssssssssssssssssssssssssssssssssssssssssssssssss", errorMessage: "Client name can not have more than 50 characters" }
    // ];
})